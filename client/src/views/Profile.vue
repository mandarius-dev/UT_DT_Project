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
                                            <h3> {{first_name}} {{last_name}}
                                                <span class="font-weight-light">, {{age}}</span>
                                            </h3>
                                            <base-button class="mb-3" type="primary" @click="getUserData">Show user data</base-button>
                                        </div>
                                        <div class="col-lg-1 order-lg-2">
                                            <router-link to="/register" class="btn btn-primary">
                                                Make appoiment
                                            </router-link>
                                        </div>
                                    </div>
                                    <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>Gender: {{gender}}</div>
                                    <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>Address: {{address}}</div>
                                </div>
                                <div class="mt-5">
                                    <h5>Stomac pain</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>The description of what the patient said</p>
                                        </div>
                                    </div>
                                    <h5>Diagnostic</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>The diagnostic given by the doctor</p>
                                        </div>
                                    </div>
                                    <h5>Medication</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>Prescription given by the doctor</p>
                                        </div>
                                    </div>
                                    <h5>Observations</h5>
                                    <div class="row">
                                        <div class="col-lg">
                                            <p>Should be addmited to the hospital</p>
                                        </div>
                                    </div>
                                    <base-button class="mb-3" type="primary" @click="test">Cancel appoiment</base-button>
                                </div>
                            </div>
                        </card>
                    </div>  
                    <div class="col-lg-4">
                        <card type="secondary" shadow
                            header-classes="bg-grey pb-5"
                            body-classes="px-lg-5 py-lg-5"
                            class="border-0">
                            <template>
                                <div class="text-left text-muted mb-4" >
                                    <h2>Appoinments</h2>
                                </div>
                                <div class="mb-3 mt-2">
                                    <base-button class="btn-1" outline type="primary">
                                        <h5>Monday, 3</h5>
                                        <h6>Simple idagnostic</h6>
                                    </base-button>
                                </div>
                                <div class="mb-3 mt-2">
                                    <base-button class="btn-1" outline type="primary">
                                        <h5>Monday, 3</h5>
                                        <h6>Simple idagnostic</h6>
                                    </base-button>
                                </div>
                                <div class="mb-3 mt-2">
                                    <base-button class="btn-1" outline type="primary">
                                        <h5>Monday, 3</h5>
                                        <h6>Simple idagnostic</h6>
                                    </base-button>
                                </div>
                            </template>
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

    beforeMount(){
                axios.put("http://localhost:8082/profile", {username: localStorage.getItem('username')}).then(
                response => (this.user_id = response.data.user_id,

                    this.first_name = response.data.first_name,
                    this.gender = response.data.gender,
                    this.last_name = response.data.last_name,
                    this.address = response.data.address,
                    this.phone_number = response.data.phone_number,
                    this.age = response.data.age,
                    this.user_type = response.data.user_type) 
            );

    },

    data() {
        return {
            user_id: '',
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            gender: '',
            address: '',
            age: '',
            phone_number: '',
            user_type: ''
        };
    },
    methods: {
        test: function() {
            console.log(localStorage.getItem('username'));

            console.log(this.user_id);
            console.log(this.gender);
            console.log(this.first_name);
            console.log(this.last_name);
        },
        getUserData: function(){
            
        }
}
};
</script>
<style>
</style>
