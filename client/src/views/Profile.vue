<template>
    <div class="profile-page">
        <section class="section section-skew">
            <div class="container pt-lg-md">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <card shadow class="card-profile" no-body>
                            <div class="px-4">
                                <div class="text-left mt-5">
                                    <div class="row">
                                        <div class="col-lg-8 order-lg-1">
                                            <h3>Jessica Jones
                                                <span class="font-weight-light">, Age</span>
                                            </h3>
                                        </div>
                                        <div class="col-lg-1 order-lg-2">
                                            <router-link to="/register" class="btn btn-primary">
                                                Make appoiment
                                            </router-link>
                                        </div>
                                    </div>
                                    <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>Gender</div>
                                    <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>Address</div>
                                </div>
                                <div class="mt-5">
                                    <h5>{{short_description}}</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{description}}</p>
                                        </div>
                                    </div>
                                    <h5>Diagnostic</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{diagnostic}}</p>
                                        </div>
                                    </div>
                                    <h5>Medication</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{medication}}</p>
                                        </div>
                                    </div>
                                    <h5>Observations</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>{{remark}}</p>
                                        </div>
                                    </div>
                                    <base-button class="mb-3" type="primary" @click="cancel_appointment">Cancel appoiment</base-button>
                                </div>
                            </div>
                        </card>
                    </div>  
                    <div class="col-lg-4">
                        <card type="secondary" shadow
                            header-classes="bg-grey pb-5"
                            body-classes="px-lg-5 py-lg-5"
                            class="border-0">
                            <div>
                                <div class="text-left text-muted mb-4" >
                                    <h2>Appoinments</h2>
                                </div>
                                <div class="mb-3 mt-2" v-for="(app, index) in appointments" :key="index">
                                    <base-button @click="button_click(index)" style="width: 100%" class="btn-1" outline type="primary">
                                        <h6>{{app.date}}</h6>
                                        <h5>{{app.name_doc}}</h5>
                                        <h6>{{app.short_description}}</h6>
                                    </base-button>
                                </div>
                            </div>
                        </card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "Profile",
    beforeMount() {
        axios.put("http://localhost:8082/user_appointment",{username: localStorage.getItem('username')}).then(
            response => (this.appointments = response.data)
        )
    },
    data() {
        return {
            name: "Profile",
            appointments: {},
            short_description: "Welcome to the appointment manager",
            description: "Below you would see what the doctor recomends",
            diagnostic: "",
            medication: "",
            remark: "",
            date: "",
            index: -1
        };
    },
    methods: {
        cancel_appointment: function() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            
            console.log(new Date(today))
            console.log(new Date(this.date))

            if(new Date(this.date) > new Date(today)) {
                axios.put("http://localhost:8082/delete_appointment", {id: this.appointments[this.index].id}).then(

                )
                this.appointments.splice(this.index,1)
                this.short_description = "Welcome to the appointment manager"
                this.description = "Below you would see what the doctor recomends"
                this.diagnostic = ""
                this.medication = ""
                this.remark =  ""
                this.date = ""
                this.index = -1
            }
            else
                console.log(false)
        },

        button_click: function(index) {
            console.log(this.appointments[index].date)
            this.short_description = this.appointments[index].short_description;
            this.description = this.appointments[index].description;
            this.diagnostic = this.appointments[index].diagnostic;
            this.medication = this.appointments[index].medication;
            this.remark = this.appointments[index].remark;
            this.date = this.appointments[index].date;
            this.index = index;
        }
}
};
</script>
<style>
</style>
