const mongo = require('./mongo')
const specializationSchema = require('./schemas/specialization')
const doctorSchema = require('./schemas/doctor')
const patientSchema = require('./schemas/patient')
const userSchema = require('./schemas/user')

const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try {
            console.log('connected to mongodb');

            const resultUser = await userSchema.findOne({
                last_name: 'Daniel',
                user_type: 2
            })

            console.log(resultUser)

            const resultDoctor = await doctorSchema.findOne({
                user_id: new mongoose.Types.ObjectId(resultUser._id.valueOf())
            })

            console.log(resultDoctor.spec_id.valueOf())

            const resultSpec = await specializationSchema.findOne({
                _id: new mongoose.Types.ObjectId(resultDoctor.spec_id.valueOf())
            })

            console.log(resultSpec)
        } finally {
            mongoose.connection.close()
        }
    })
}

connectToMongoDB()