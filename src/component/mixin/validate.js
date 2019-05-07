export default {
    methods: {
        clearValidate({formName='form', delay=100}) {
            let form = this.$refs[formName]
            //console.log(form)

            if(form) {
                if(delay && delay>0) {
                    setTimeout(function(){
                        //console.log("clearValidate")
                        form.clearValidate()
                    },delay)
                }
                else {
                    form.clearValidate()
                }
            }
        },
        validate(formName='form') {
            let self = this
            return new Promise((resolve,reject)=>{
                self.$refs[formName].validate(function(valid) {
                    if(valid) {
                        resolve()
                    }
                })
            })
            
        }
    }
}