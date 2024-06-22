<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <div class="modal-close" @click="closeModal">&#10006;</div>
            <slot name="title">
                <h3 class="modal-title">Создать новый скрипт</h3>
            </slot>
            <slot name="body">
                <div class="modal-content">

                    <div class="form-group">
                        <input type="text" id="name"  v-model="name" placeholder="Название скрипта" required/>
                    </div> 
                    <div class="form-group">
                        <input type="text" id="purpose"  v-model="purpose" placeholder="Цель скрипта" required/>
                    </div> 
                </div>
                
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button" type="submit" @click="closeModal">
                        Создать
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>
 
<script>
    import {useRouter,useRoute } from 'vue-router'
    import axios from 'axios';
    export default {
        data(){
            return {
                name: '',
                purpose: '',
                id:0,
      }
        },
        name: "ModalWindow",
        data: function () {
            return {
                show: false
            }
        },
        methods: {
            closeModal: function () {
                axios.post("http://88.84.211.248:5000/create",
                    {
                        'name':this.name,
                        'purpose': this.purpose,
                        'json': "{}"
                    }
                    );

                this.show = false
                axios.get('http://88.84.211.248:5000/getall') .then(response => { 
                for (var key in response.data) {
                    this.id = response.data[key].id
                }
                
                router.push({ path: '/editor/'+this.id })
                })
                
            }
        }
    }
</script>
 
<style scoped
       lang="scss">
    .modal-shadow {
        position: absolute ;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }
 
    .modal {
        border: 3px solid black;
        background: #fff;
        border-radius: 8px;
        padding: 15px;
        min-width: 420px;
        max-width: 480px;
        position: absolute   ;
        top: 400%;
        left: 50%;
        transform: translate(-50%, -50%);
 
        &-close {
            border-radius: 50%;
            color: #fff;
            background: #2a4cc7;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
 
        &-title {
            color: #0971c7;
        }
 
        &-content {
            margin-bottom: 20px
        }
 
        &-footer {
            &__button {
                background-color: #0971c7;
                color: #fff;
                border: none;
                text-align: center;
                padding: 8px;
                font-size: 17px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
                cursor: pointer;
            }
        }
    }
    .form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
}

.form-group input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus {
  border-color: #000000;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.25);
}
</style>