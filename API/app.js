const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./database/mongoose')
const jwt = require ('jsonwebtoken');


const {list, schedules, User} = require('./database/index');

app.use (bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
    res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
    next();
});

let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            res.status(401).send(err);
        } else {
            req.user_id = decoded._id;
            next();
        }
    });
}
let verifySession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');
    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }
        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;
        let isSessionValid = false;
        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    isSessionValid = true;
                }
            }
        });
        if (isSessionValid) {
            next();
        } else {
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }
    }).catch((e) => {
        res.status(401).send(e);
    })
}

app.get('/list', authenticate, (req, res)=>{
    list.find({
        _userId: req.user_id
    }).then((list)=>{
    res.send(list);
    }).catch((e)=>{
        res.send(e);
    })
})

app.post('/list', authenticate, (req, res)=>{
let title = req.body.title;

let newList = new list({
    title,
    _userId: req.user_id
});
newList.save().then((listDoc)=>{
res.send(listDoc);
})
});

app.patch('/list/:id', authenticate, (req, res)=>{
list.findOneAndUpdate({_id: req.params.id, _userId: req.user_id},{
    $set:req.body
    }).then(() => {
        res.send({message: 'Updated Successfully.'});
    });
});

app.delete('/list/:id', authenticate, (req, res)=>{
list.findOneAndRemove({
    _id: req.params.id,
    _userId: req.user_id
}).then((removedlistDoc)=>{
    res.send(removedlistDoc);
deleteSchedulesFromList(removedlistDoc._id);
})
});

app.get('/list/:listId/schedules',authenticate,  (req, res)=>{
schedules.find({
    _listId: req.params.listId
}).then((schedules)=>{
res.send(schedules);
})
});

app.get('/list/:listId/schedules/:scheduleId', (req, res) => {
    schedules.findOne({
        _id: req.params.scheduleId,
        _listId: req.params.listId, 
}).then ((schedules)=>{
    res.send(schedules);
})
})

app.post('/list/:listId/schedules', authenticate, (req, res)=>{
    list.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list)=> {
        if(list) {
            return true;
        }
        return false;
    }).then((canCreateSchedule) => {
        if (canCreateSchedule) {
            let newschedules = new schedules({
                title: req.body.title,
                _listId: req.params.listId
            })
        
            newschedules.save().then((newschedulesdoc) =>{
                res.send(newschedulesdoc);
            })
        } else {
            res.sendStatus(404);
        }
    })
})
    

app.patch('/list/:listId/schedules/:scheduleId', authenticate, (req, res) => {
    list.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
    }).then((canUpdateSchedules) => {
        if (canUpdateSchedules) {
            schedules.findOneAndUpdate({
                _id: req.params.scheduleId,
                _listId: req.params.listId,
            }, {$set:req.body
        }).then(()=> {
            res.send({message: "Updated Successfully"});
        })
        } else {
            res.sendStatus(404);
        }
    })
});

app.delete('/list/:listId/schedules/:scheduleId', authenticate, (req, res) => {
    list.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
}).then((canDeleteSchedules) => {
    if (canDeleteSchedules) {
        schedules.findOneAndRemove({
            _id: req.params.scheduleId,
            _listId: req.params.listId,
        }).then((removedscheduledoc)=>
        {
            res.send(removedscheduledoc);
        })
    } else {
        req.sendStatus(404);
    }
    });
});

app.post('/users', (req, res) => {
    let body = req.body;
    let newUser = new User(body);
    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            return user.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.get('/users/me/access-token', verifySession, (req, res) => {
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})
let deleteSchedulesFromList = (_listId) => {
    schedules.deleteMany({
        _listId
    }).then(() => {
        console.log("Schedules from " + _listId + " were deleted!");
    })
}

app.listen(3000, ()=>{
    console.log("Server is listening to port 3000");
});