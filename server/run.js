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

api.put('/login_doctor', async function (request, response) {
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
        const doc = await doctorSchema.find({
          user_id: new mongoose.Types.ObjectId(resultDoc[i]._id.valueOf())
        })

        const appNumber = await appointmentSchema.find({
          doct_id: new mongoose.Types.ObjectId(resultDoc[i]._id.valueOf()),
          date: request.body.date
        })

        const spec = await specializationSchema.find({
          _id: new mongoose.Types.ObjectId(doc[0].spec_id.valueOf())
        })

        var docInfo = {
          id: new mongoose.Types.ObjectId(resultDoc[i]._id.valueOf()),
          name: resultDoc[i].first_name + " " + resultDoc[i].last_name,
          spec: spec[0].spec_name,
          appNumber: appNumber.length
        }

        responseDoc.push(docInfo)
      }

      console.log(responseDoc)

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
        diagnostic: "No diagnostic given",
        medication: "No medication yet",
        title: request.body.short_description
      }

      await new appointmentSchema(appointment).save();
    } finally {
        mongoose.connection.close()
    }
})
});

api.put('/user_appointment', async function (request, response) {
  await mongo().then(async (mongoose) => {
    try {
      console.log(request.body)
      
      const user = await userSchema.find({
        username: request.body.username,
        user_type: 1
      })

      const appointments = await appointmentSchema.find({
        user_id: new mongoose.Types.ObjectId(user[0]._id.valueOf())
      })

      var responseApp = []

      for(var i=0; i < appointments.length; i++)
      {
        const doc = await doctorSchema.find({
          user_id: new mongoose.Types.ObjectId(appointments[i].doct_id.valueOf())
        })

        const docName = await userSchema.find({
          _id: new mongoose.Types.ObjectId(appointments[i].doct_id.valueOf()),
          user_type: 2
        })

        const spec = await specializationSchema.find({
          _id: new mongoose.Types.ObjectId(doc[0].spec_id.valueOf())
        })

        var appInfo = {
          id: new mongoose.Types.ObjectId(appointments[i]._id.valueOf()),
          name_doc: docName[0].first_name + " " + docName[0].last_name,
          spec: spec[0].spec_name,
          date: appointments[i].date,
          short_description: appointments[i].title,
          description: appointments[i].description,
          diagnostic: appointments[i].diagnostic,
          medication: appointments[i].medication,
          remark: appointments[i].remark,
        }

        responseApp.push(appInfo)
      }

      //console.log(responseApp);

      response.json(responseApp);
    } finally {
        mongoose.connection.close()
    }
})
});

api.put('/doc_appointment', async function (request, response) {
  await mongo().then(async (mongoose) => {
    try {
      console.log(request.body)
      
      const doc = await userSchema.find({
        username: request.body.username,
        user_type: 2
      })

      const appointments = await appointmentSchema.find({
        doct_id: new mongoose.Types.ObjectId(doc[0]._id.valueOf()),
        date: request.body.date
      })

      var responseApp = []

      for(var i=0; i < appointments.length; i++)
      {
        const user = await userSchema.find({
          user_id: new mongoose.Types.ObjectId(appointments[i].user_id.valueOf()),
          user_type: 1
        })

        var appInfo = {
          id: new mongoose.Types.ObjectId(appointments[i]._id.valueOf()),
          name_user: user[0].first_name + " " + user[0].last_name,
          date: appointments[i].date,
          short_description: appointments[i].title,
          description: appointments[i].description,
          diagnostic: appointments[i].diagnostic,
          medication: appointments[i].medication,
          remark: appointments[i].remark,
        }

        responseApp.push(appInfo)
      }

      console.log(responseApp);

      response.json(responseApp);
    } finally {
        mongoose.connection.close()
    }
})
});

api.put('/delete_appointment', async function (request, response) {
  await mongo().then(async (mongoose) => {
    try {
      console.log(request.body)
      
      await appointmentSchema.deleteOne({
        _id: new mongoose.Types.ObjectId(request.body.id)
      })
    } finally {
        mongoose.connection.close()
    }
})
});

api.listen(8082, function(){
  console.log('CORS-enabled web server is listening on port 8082...');
});                                               