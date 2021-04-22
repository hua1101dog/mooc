<template>
<div>
   <Show-ticket :showPrint="flag" :data="stuObj"></Show-ticket>
</div>
</template>

<script>
import ShowTicket from "./components/showTicket";
import { preview} from "@/api/mooc/student";
export default {
   components: {  ShowTicket },
     name:'showTicket',
  data() {
    return {
      flag:false,
      stuObj:{
        
      }
    };
  },
  methods:{
    isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    getData(id){
   preview(id).then(res=>{
  this.stuObj=res.data
      })
    }
  },

  mounted: function(){
     if(this.isMobile()){
         this.flag=false
     }else{
   
      this.flag=true
     }
     this.getData(this.$route.query.id)
  },
  activated:function(){
    if(this.isMobile()){
         this.flag=false
     }else{
   
      this.flag=true
     }
      this.getData(this.$route.query.id)
  }

};
</script>
<style lang="scss" scoped>
.table_ticket {
  margin: 0 auto;

  // width: 510px;
}
.table_title {
  height: 66px;
  font-weight: 700;
  font-size: 20px;
}
td {
  width: 100px;
  height: 39px;
  font-size: 16px;
}
.print {
  background: #bbb !important;
  border-color: #bbb !important;
  margin: 30px calc(50% - 40px);
  border-radius: 7px;
}
</style>
