const handleSignin = (req,res,bcrypt,db)=>{
    db.select('email','hash')
     .from('login')
     .where('email', '=', req.body.email)
     .then(data=>{
         const {email,hash} = data[0];
         const isvalid = bcrypt.compareSync(req.body.password, hash);
         if(isvalid){
            db
             .select('*')
             .from('users')
             .where('email', '=', req.body.email)
             .then(user=>{
                 res.json(user[0])
             }).catch(err=> res.status(400).json('unable to get user'))    
         }  
         else{
             res.status(400).json('wrong credentials')
         }

     }).catch(err=> res.status(400).json('cannot get user'));
};

module.exports={
    handleSignin: handleSignin
};