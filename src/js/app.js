//Based On https://codepen.io/AndrewThian/pen/QdeOVa

Vue.prototype.$http = axios

class Resource {
    constructor(title, link, author, img) {
      this.title = title;
      this.link = link;
      this.author = author;
      this.img = img;
    }
}

  class ResourceCollection {
    constructor(content) {     

       const itemH1     = '-' + String.fromCharCode('32');
       const itemH2     = '    - '; //String.fromCharCode('9') + '-' + String.fromCharCode('32');
       const itemH2Link = itemH2 + 'Link:';
       const itemH2Desc = itemH2 + 'Description:';
       const itemH2Img  = itemH2 + 'Img:';
       
       let lines  =  content.split('\n'); 
       let el = {'item':[]};
       let k = 0;
       
       //MarkDown File Parser Prototype, not optimized ... at all
       for( var i = 0 ; i< lines.length; i ++){
           if(lines[i].indexOf(itemH1) == 0){
                let b       = {};
                b.title     =  lines[i].replace(itemH1,'');
                b.link      = '';
                b.desc      = '';
                el.item[k]  = b;
                
                for( var j = (i+1) ; j < lines.length; j ++){
                    if(lines[j].indexOf(itemH2) == 0){
                        if(lines[j].indexOf(itemH2Link) == 0){
                            el.item[k].link = lines[j].replace(itemH2Link,'');
                        }
                        if(lines[j].indexOf(itemH2Img) == 0){
                            el.item[k].img = lines[j].replace(itemH2Img,'');
                        }
                        el.item[k].desc = lines[j].indexOf(itemH2Desc) == 0 ? lines[j].replace(itemH2Desc,'')  : el.item[k].desc;
                    }else{
                        k++
                        i = j;
                        break;
                    }
                }
           }
       }
       return el.item;
    }

  }

 
  
  const app = new Vue ({
    el: '#app',
    data: {
      search: '',
      ResourceList: []
    },
    computed: {
      filteredList() {
        return this.ResourceList.filter(Resource => {
          return Resource.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    methods:{
        loadResources() {
            const url = 'resources_misc.md';
            this.$http.get(url)
            .then((result) => {
                this.ResourceList = new ResourceCollection(result.data);
             })            
        },
        imageUrlDefault(event) {
          event.target.src = "src/img/default.png";
        },
        grabFavicon(urlIcon){
            /*
            this.$http.get("http://favicongrabber.com/api/grab/" + urlIcon.replace('https://','').replace('http://','').replace(' ',''))
            .then((result) => {
                console.log(result.data.icons[0].src)
               //return result.data.icons[0].src;
               let a = this.$refs.thumb;
               a.attribute('src',result.data.icons[0].src)

              
             })   */
        }
        
    },
    beforeMount(){
        this.loadResources();
    }
  })