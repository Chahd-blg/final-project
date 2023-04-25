// *****************************Imporation des modules:

//import express module
const express = require("express");
//import bcrypt module (for signup BL)
const bcrypt = require("bcrypt");
//import body parser module
const bodyParser = require("body-parser");
//import mongoose
const mongoose = require("mongoose");
//import multer module (for signup BL)
const multer = require("multer");
//import path module interne(for signup BL)
const path = require("path");
//import jwt module(for login BL)
const jwt = require("jsonwebtoken");
//import authentification methode (for login BL)
const authenticate = require("./middelware/authenticate");

const jwt_decode = require('jwt-decode');





// *****************************Configuration des modules:

//Creates an Express application.
const app = express();

//configure body parser
//send JSON responses:( de back vers front)
app.use(bodyParser.json());
//get obj from request
app.use(bodyParser.urlencoded({ extended: true }));

//data base name of this project : elderlyiDB
mongoose.connect('mongodb://127.0.0.1:27017/elderlyiDB',
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
        if (err)
            console.error(err);
        else
            console.log("Connected to the mongodb");
    });


// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

//avatars => shortcut (back-end/images => original path)
app.use('/avatars', express.static(path.join('back-end/images')));
const MIME_TYPE = {
    //"type de media":"extention"
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        //"back-end/images" hedha el path mt3na fel cas hakka ytbadel selon l projet 
        cb(null, 'back-end/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + extension;
        cb(null, imgName);
    }
});

//pdf config storageConfig_CV & MIME_TYPE_CV
app.use('/cvs', express.static(path.join('back-end/CVs')));
const MIME_TYPE_CV = {
    //"type de media":"extention"
    'application/pdf': 'pdf',
}
const storageConfig_CV = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_CV[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        //"back-end/images" hedha el path mt3na fel cas hakka ytbadel selon l projet 
        cb(null, 'back-end/CVs')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE_CV[file.mimetype];
        const fileName = name + '-' + Date.now() + '-chouchou-' + '.' + extension;
        cb(null, fileName);
    }
});
// *****************************Imporation des modeles:
const User = require("./models/user");









//*****************************les traitements logiques:
//usersignup BL:
app.post("/allUsers/userSubscription", multer({ storage: storageConfig }).single('img'),
    (req, res) => {
        console.log("signup user obj", req.body);

        bcrypt.hash(req.body.password, 8).then(
            (cryptedPwd) => {
                let user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    adress: req.body.adress,
                    password: cryptedPwd,
                    tel: req.body.tel,
                    role: req.body.role,
                    avatar: `http://localhost:3001/avatars/${req.file.filename}`

                });
                user.save(
                    (error, doc) => {
                        console.log("here error", error);
                        console.log("here error", doc);
                        if (doc) {
                            res.json({ message: "added successfylly" });
                        } else {
                            res.json({ message: "ERROR" });
                        }
                    }
                );
            }
        )
    });

//assistance signup BL:
app.post("/allUsers/assistSubscription", multer({ storage: storageConfig_CV }).single('cv'),
    (req, res) => {
        console.log("signup assistance obj", req.body);

        bcrypt.hash(req.body.password, 8).then(
            (cryptedPwd) => {
                let assistance = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    adress: req.body.adress,
                    password: cryptedPwd,
                    gender: req.body.gender,
                    birthday: req.body.birthday,
                    role: req.body.role,
                    status: req.body.status,
                    cv: `http://localhost:3001/cvs/${req.file.filename}`

                });
                assistance.save(
                    (error, doc) => {
                        console.log("here error", error);
                        console.log("here error", doc);
                        if (doc) {
                            res.json({ message: "added successfylly" });
                        } else {
                            res.json({ message: "ERROR" });
                        }
                    }
                );
            }
        )
    });

//signup admin BL:
app.post("/allUsers/adminSubscription", (req, res) => {
    bcrypt.hash(req.body.password, 8).then(
        (cryptedPwd) => {
            let admin = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: cryptedPwd,
                role: req.body.role,
            });
            admin.save((error, doc) => {
                if (error) {
                    console.error('Error saving user:', error);
                    res.status(500).json({ message: 'Error saving user' });
                } else {
                    console.log('User saved successfully:', doc);
                    res.json({ message: 'User saved successfully' });
                }
            })
        }
    )

})

//login BL : 
app.post("/allUsers/login", (req, res) => {
    let user = req.body;
    let findedUser;

    User.findOne({ email: user.email })
        .then((doc) => {
            if (!doc) {
                // User not found in DB by email, try finding by phone number

                return User.findOne({ tel: user.tel });
            } else {
                // User found by email, compare password
                return bcrypt.compare(user.password, doc.password)
                    .then((passwordResult) => {
                        if (passwordResult) {
                            // If password comparison succeeds, set findedUser and return doc
                            findedUser = doc;
                            return doc;
                        } else {
                            // Password does not match, send error response
                            res.json({ message: "check password" });


                        }
                    });
            }
        })
        .then((docByTel) => {
            if (!docByTel) {
                // User not found in DB by phone number
                res.json({ message: "check your infos" });
            } else {
                // User is found by phone number, compare password
                return bcrypt.compare(user.password, docByTel.password)
                    .then((passwordResult) => {
                        if (passwordResult) {
                            // If password comparison succeeds
                            findedUser = docByTel;
                            return docByTel;
                        } else {
                            // Password does not match
                            res.json({ message: "check password" });
                        }
                    });
            }
        })
        .then(() => {
            // If all password comparisons succeed
            const token = jwt.sign(
                {
                    email: findedUser.email,
                    userId: findedUser._id,
                    userRole: findedUser.role,
                },
                "Testing",
                { expiresIn: "60min" }
            );

            let userToSend = {
                id: findedUser._id,
                firstName: findedUser.firstName,
                lastName: findedUser.lastName,
                role: findedUser.role,
                jwt: token,
                expiresIn: 3600,
            };

            res.json({ message: "2", user: userToSend });
        })

});
//getuserBy id 

app.get('/allUsers/:id', (req, res) => {
    const id = req.params.id;

    User.findOne({ _id: id }).then((data) => {
        if (data) {
            res.json({ user: data });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//getall
app.get("/allUsers", (req, res) => {
    User.find().then(
        (data) => {
            console.log("all type of users", data);
            res.json({ foundedUser: data, message: "here is foundedUser" });
        }
    )
});

//Get assistances
app.get("/allUsers/assistant", (req, res) => {
    User.find({ role: "assistance" },{ _id: 0 }).then(
        (obj) => {
            console.log(obj);
            res.json({ assistances: obj, message: "here all uers from DB" })

        }
    )
});
//Get users
app.get("/allUsers/users", (req, res) => {
    User.find({ role: "user" }).then(
        (data) => {
            console.log("here all type of users", data);
            res.json({ user: data, message: "here all uers from DB" })

        }
    )
});
//get assist info by id 
app.get("/allUsers/:myid", (req, res) => {
    let id = req.params.myid
    console.log(id);

    User.findOne({_id: id }).then(
        (data) => {
            console.log(data);

            res.json({ assist: data, message: "here assistant info " })
        }
    )
});

//searh assist info by name 
app.post("/allUsers/search", (req, res) => {
    let firstName = req.body.firstName
    console.log("here obj sent by service", firstName);
    User.find({ firstName: firstName }).then(
        (data) => {
            if (data.length === 0) {
                res.json({ message: "No assistant found with the given name" });
            } else {
                res.json({ assistant: data });
            }
        }
    )
})

//updateStatus of assistant
app.put("/allUsers/:xid", (req, res) => {

    let assistantId = req.params.xid;

    User.updateOne({_id: assistantId}, {status: 'confirmed' })
        .then(
            (data) => {
                if (data.ok == 1) {
                    User.findOne({_id: assistantId }).then(
                        (docFromDB) => {
                            res.json({ newAssistant: docFromDB, message: "Updated Successfully  " });
                        }
                    )
                } else {
                    res.json({ message: "Update failed" })

                }
            }
        );
})

//edit profile 

// app.put("/allUsers/edituser", (req, res) => {
//     let modifs = req.body
//     console.log(modifs);

//     User.findOne({_id : modifs.id}).then(
//         (doc) => {
//             if (doc) {
//                 bcrypt.compare(modifs.oldPassword, doc.password, (error, passwordMatch) => {
//                     if (passwordMatch) {
//                         bcrypt.hash(modifs.newPassword, 8, (error, hash) => {
//                             if (error) {
//                                 console.log(error);
//                                 res.json({ error: "Password not updated." });
//                             } else {
//                                 doc.password = hash;
//                                 doc.save((error, savedUser) => {
//                                     if (error) {
//                                         res.json({ error: "Password not updated." });
//                                     } else {
//                                         res.json({ savedUser: savedUser, message: "Password updated successfully." });
//                                     }
//                                 });
//                             }
//                         });
//                     } else {
//                         res.json({ error: "Old password is incorrect." });
//                     }
//                 });
//             } else {
//                 res.json({ error: "User not found." });
//             }

//         }
//     )
// })














// make app importable from another files.(this line must be the last one veryyyy important !)
module.exports = app;