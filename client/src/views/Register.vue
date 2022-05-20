<template>
    <section class="section section-shaped section-lg my-0">
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-9">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-8"
                          class="border-0">
                        <template>
                            <div class="text-left text-muted mb-4">
                                <h2>Create an appointment</h2>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Short description"
                                            addon-left-icon="ni ni-bold"
                                            v-model="short_description">
                                </base-input>
                                <textarea class="form-control form-control-alternative mb-3" 
                                          rows="5" 
                                          placeholder="Describe your symptoms"
                                          v-model="simptoms">
                                </textarea>
                                <base-input addon-left-icon="ni ni-calendar-grid-58">
                                    <flat-picker slot-scope="{focus, blur}"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="{allowInput: true}"
                                                class="form-control datepicker"
                                                v-model="dates.simple">
                                    </flat-picker>
                                </base-input>
                                <select class="form-select mb-3" @change="select_change($event)">
                                    <base-button slot="title" type="secondary" class="dropdown-toggle">
                                        Select a doctor
                                    </base-button>
                                    <option class="dropdown-item" v-for="(doc, index) in doctors" :key="index">
                                        {{index+1}}. {{doc.name}}  -  {{doc.spec}}
                                    </option>
                                </select>
                                <div class="text-center">
                                    <base-button @click="make_appoitment" type="primary" class="my-4">Create appoiment</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import dropdown from "./components/BaseDropdown";

import Vue from "vue";
import axios from 'axios';

Vue.config.productionTip = false;

// Globally register your component
Vue.component('base-dropdown', dropdown);

export default {
    components: {
        flatPicker,
        dropdown
    },

    beforeMount() {
        axios.put("http://localhost:8082/doctor",{}).then(
            response => (this.doctors = response.data)
        )
    },
    data() {
        return {
            dates: {
                simple: "2018-07-17"
            },
            doctors: {},
            short_description: "",
            simptoms: "",
            choosen_doctor_id: ""
        };
    },
    methods: { 
        make_appoitment: function() {
            if(this.choosen_doctor_id == "")
                this.choosen_doctor_id = this.doctors[0].id
            console.log(this.choosen_doctor_id) 
            axios.put("http://localhost:8082/appoitnment", {username: localStorage.getItem('username'), 
                                                           doc_id: this.choosen_doctor_id, 
                                                           short_description: this.short_description,
                                                           simptoms: this.simptoms,
                                                           date: this.dates.simple})

        },

        select_change: function(event) {
            this.choosen_doctor_id = this.doctors[event.target.value.split(".")[0]-1].id;  
        }
    }
};
</script>
<style>
</style>
