const mongo = require('./mongo')
const specializationSchema = require('./schemas/specialization')
const doctorSchema = require('./schemas/doctor')
const patientSchema = require('./schemas/patient')
const userSchema = require('./schemas/user')
const appointmentSchema = require('./schemas/appointment')
var api = require('./api.js').app;

api.put('/login', async function (request, response) {
  await mongo().then(async (mongoose) => {
    try {
        console.log(request.body)
        
        const resultUser = await userSchema.findOne({
            username: request.body.username,
            password: request.body.password,
            user_type: 1
        })

        console.log(resultUser)

        if(resultUser)
          response.json("true");
        else
          response.json("false")
    } finally {
        mongoose.connection.close()
    }
})
});

api.put('/login_doc', async function (request, response) {
  await mongo().then(async (mongoose) => {
    try {
        console.log(request.body)
        
        const resultUser = await userSchema.findOne({
            username: request.body.username,
            password: request.body.password,
            user_type: 2
        })

        console.log(resultUser)

        if(resultUser)
          response.json("true");
        else
          response.json("false")
    } finally {
        mongoose.connection.close()
    }
})
});

api.put('/doctor', async function (request, response) {
  await mongo().then(async (mongoose) => {
    try {
        console.log(request.body)
        
        const resultDoc = await userSchema.find({
            user_type: 2
        })

        var responseDoc = []

        for(var i=0; i < resultDoc.length; i++)
        {
            //console.log(resultDoc[i])

            const doc = await doctorSchema.find({
              user_id: new mongoose.Types.ObjectId(resultDoc[i]._id.valueOf())
            })

            //console.log(doc[0])

            const spec = await specializationSchema.find({
              _id: new mongoose.Types.ObjectId(doc[0].spec_id.valueOf())
            })

            var docInfo = {
              id: new mongoose.Types.ObjectId(resultDoc[i]._id.valueOf()),
              name: resultDoc[i].first_name + " " + resultDoc[i].last_name,
              spec: spec[0].spec_name

            }

            responseDoc.push(docInfo)
        }

        //console.log(responseDoc)

        if(resultDoc)
          response.json(responseDoc);
        else
          response.json("false")
    } finally {
        mongoose.connection.close()
    }
})
});

api.put('/appoitnment', async function (request, response) {
  await mongo().then(async (mongoose) => {
    try {
        console.log(request.body)
        
        const user = await userSchema.findOne({
          username: request.body.username
        })

        const appointment = {
          user_id: new mongoose.Types.ObjectId(user._id.valueOf()),
          doct_id: new mongoose.Types.ObjectId(request.body.doc_id),
          date: request.body.date,
          remark: "No remarks yet.",
          description: request.body.simptoms,
          medication: "No medication yet",
          title: request.body.short_description
        }

        await new appointmentSchema(appointment).save();
    } finally {
        mongoose.connection.close()
    }
})
});

api.listen(8082, function(){
  console.log('CORS-enabled web server is listening on port 8082...');
});