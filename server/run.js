const mongo = require('./mongo')
const specializationSchema = require('./schemas/specialization')
const doctorSchema = require('./schemas/doctor')
const patientSchema = require('./schemas/patient')
const userSchema = require('./schemas/user')
var api = require('./api.js').app;

api.put('/login', function(request, response) {
  mongo().then(async (mongoose) => {
    try {
        console.log(request.body)
      
        const resultUser = await userSchema.findOne({
            username: request.body.username,
            password: request.body.password,
            user_type: 1
        })

        if(resultUser != null)
          response.json("true");
        else
          response.json("false")
    } finally {
        mongoose.connection.close()
    }
})
});

api.listen(8081, function(){
  console.log('CORS-enabled web server is listening on port 8081...');
});