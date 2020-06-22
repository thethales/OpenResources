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
      //Not optimized list
      const mdH1     = '# ';
      const mdH2     = '## ';
      const mdL1     = '-' + String.fromCharCode('32');
      const mdL2     = '    - '; //String.fromCharCode('32') +  String.fromCharCode('32')  

      const mdL2Link      = mdL2 + 'Link:';
      const mdL2Desc      = mdL2 + 'Description:';
      const mdL2Img       = mdL2 + 'Img:';
      const mdL2Tags      = mdL2 + 'Tags:';
      const mdL2Licence   = mdL2 + 'License:';
      const mdL2LongDesc  = mdL2 + 'LongDescription:'
      
      let lines  =  content.split('\n'); 
      let el = {'item':[]};
      let k = 0;
      
      //MarkDown File Parser Prototype, not optimized ... at all
      for( var i = 0 ; i< lines.length; i ++){
          if(lines[i].indexOf(mdH1) == 0){
          
          }
          else{
            if(lines[i].indexOf(mdL1) == 0){
                let b       = {};
                b.title     =  lines[i].replace(mdL1,'');
                b.link      = '';
                b.desc      = '';
                el.item[k]  = b;
                
                for( var j = (i+1) ; j < lines.length; j ++){
                    if(lines[j].indexOf(mdL2) == 0){
                        if(lines[j].indexOf(mdL2Link) == 0){
                          el.item[k].link = lines[j].replace(mdL2Link,'');
                        }
                        if(lines[j].indexOf(mdL2Img) == 0){
                          el.item[k].img = lines[j].replace(mdL2Img,'');
                        }
                        if(lines[j].indexOf(mdL2Tags) == 0){
                          el.item[k].tags = lines[j].replace(mdL2Tags,'');
                        }
                        if(lines[j].indexOf(mdL2Tags) == 0){
                          el.item[k].tags = lines[j].replace(mdL2Tags,'');
                        }
                        if(lines[j].indexOf(mdL2Desc) == 0){
                          el.item[k].desc = lines[j].replace(mdL2Desc,'');
                        }
                    }else{
                        k++;
                        i = j;
                        break;
                    }
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
        }        
    },
    beforeMount(){
        this.loadResources();
    }
  })