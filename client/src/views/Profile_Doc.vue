<template>
    <div class="profile-page">
        <section class="section section-skew">
            <div class="container pt-lg-md">
                <div class="col-lg">
                    <card shadow class="card-profile" no-body>
                        <div class="px-4">
                            <div class="text-left mt-5">
                                <h3>Jessica Jones
                                    <span class="font-weight-light">, Age</span>
                                </h3>
                                <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>Gender</div>
                                <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>Address</div>
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
                                <h5>Observations</h5>
                                <div class="row">
                                    <div class="col-lg">
                                        <p>Should be addmited to the hospital</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </card>
                    <div class="row justify-content-center mr-1">
                        <div class="col-lg-4 mt-5">
                            <card type="secondary" shadow
                                header-classes="bg-grey pb-5"
                                body-classes="px-lg-5 py-lg-5"
                                class="border-0">
                                <template>
                                    <div class="text-left text-muted mb-4" >
                                        <h2>Appoinments</h2>
                                    </div>
                                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                                        <flat-picker slot-scope="{focus, blur}"
                                                    @on-open="focus"
                                                    @on-close="blur"
                                                    :config="{allowInput: true}"
                                                    class="form-control datepicker"
                                                    v-model="dates.simple">
                                        </flat-picker>
                                    </base-input>
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
                        <div class="col-lg-7 mt-5">
                            <card type="secondary" shadow
                                header-classes="bg-grey pb-5"
                                body-classes="px-lg-5 py-lg-5"
                                class="border-0">
                                <template>
                                    <div class="text-left text-muted mb-4" >
                                        <h2>Appoiment</h2>
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
                                                <textarea class="form-control form-control-alternative mb-3" 
                                                        rows="3" 
                                                        placeholder="Describe your symptoms">
                                                </textarea>
                                            </div>
                                        </div>
                                        <h5>Medication</h5>
                                        <div class="row">
                                            <div class="col-lg">
                                                <textarea class="form-control form-control-alternative mb-3" 
                                                        rows="3" 
                                                        placeholder="Describe your symptoms">
                                                </textarea>
                                            </div>
                                        </div>
                                        <h5>Observations</h5>
                                        <div class="row">
                                            <div class="col-lg">
                                                <textarea class="form-control form-control-alternative mb-3" 
                                                        rows="4" 
                                                        placeholder="Describe your symptoms">
                                                </textarea>
                                            </div>
                                        </div>
                                        <base-button class="mb-3" type="primary">Save</base-button>
                                    </div>
                                </template>
                            </card>
                        </div>
                    </div>
                </div>  
            </div>
        </section>
    </div>
</template>
<script>
    import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";
    export default {
    components: {
        flatPicker
    },
    data() {
        return {
        dates: {
            simple: "2018-07-17"
        }
        };
    }
    };
</script>
<style>
</style>
