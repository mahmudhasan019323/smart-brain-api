const handleSignup = (req,res,bcrypt,db)=>{
    const {email,name,password} = req.body;
    const hash = bcrypt.hashSync(password);

    if(!email || !name || !password){
        return res.status(400).json('invalid form submission');
    }

    db.transaction(trx=>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                })
                .then(user=>{
                    res.json(user[0])
                });    
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).catch(err => res.json('cannot register'));
      
    
};


module.exports={
    handleSignup: handleSignup
}