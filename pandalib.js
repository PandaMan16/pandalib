/**
 * Pandalib Library
 * Main namespace for all Pandalib functionality.
 * @namespace panda
 */
const panda = {
    /**
     * Utility functions.
     * @memberof panda
     * @namespace util
     */
    util: {
        /**
         * Word-related methods.
         * @memberof panda.util
         * @namespace word
         */
        word: {
            /**
             * Display multiple words in an HTML element at a given speed.
             * @memberof panda.util.word
             * @function multiple
             * @param {HTMLElement} item - Target HTML element.
             * @param {string} message - Message to display.
             * @param {number} speed - Speed to display the message.
             */
            multiple:function(item,message,speed) { 
              var vars = {
                "part":null,
                "i": 0,
                "offset": 0,
                "len": message.length,
                "forwards": true,
                "skip_count": 0,
                "skip_delay": 15,
                "speed": speed
              }
              var intervale = null;
              intervale = setInterval(function () {
                item.dataset.intervale = intervale;
                if (vars.forwards) {
                  // console.log(item.dataset.stop , vars.i == vars.len-1 , vars.offset == message[vars.i].length)
                  if (vars.offset >= message[vars.i].length) {
                    ++vars.skip_count;
                    if (vars.skip_count == vars.skip_delay) {
                      vars.forwards = false;
                      vars.skip_count = 0;
                    }
                  }
                  if(item.dataset.stop && vars.i == vars.len-1 && vars.offset == message[vars.i].length){
                    clearInterval(intervale);
                    delete item.dataset.intervale;
                  }
                }
                else {
                  if (vars.offset == 0) {
                    vars.forwards = true;
                    vars.i++;
                    vars.offset = 0;
                    if (vars.i >= vars.len) {
                      vars.i = 0;

                    }
                  }
                }
                vars.part = message[vars.i].substr(0, vars.offset);
                if (vars.skip_count == 0) {
                  if (vars.forwards) {
                    vars.offset++;
                  }
                  else {
                    vars.offset--;
                  }
                }
                // console.log();
                if(vars.part == ""){
                  item.innerHTML = "_";
                }else{
                  item.innerHTML = vars.part;
                }
                
              },speed);
            },
            /**
             * Display a simple message in an HTML element at a given speed.
             * @memberof panda.util.word
             * @function simple
             * @param {HTMLElement} item - Target HTML element.
             * @param {string} message - Message to display.
             * @param {number} speed - Speed to display the message.
             * @param {number} width - Width of the element.
             */
            simple:function(item,message,speed,width) {
              if(width){
                var styles = item.getBoundingClientRect();
                let finalWidth = parseFloat(styles.width);//tempElement.offsetWidth;
                let finalHeight = parseFloat(styles.height);//tempElement.offsetHeight;
                item.style.display = "inline-block";
                item.style.width = finalWidth + "px";
                item.style.height = finalHeight + "px";
              }
              var vars = {
                "part":null,
                "offset": 0,
                "forwards": true,
                "skip_count": 0,
                "skip_delay": 15,
                "speed": speed
              }
              var intervale = null;
              intervale = setInterval(function () {
                item.dataset.intervale = intervale;
                if (vars.forwards) {
                  if (vars.offset >= message.length) {
                    ++vars.skip_count;
                    if (vars.skip_count == vars.skip_delay) {
                      vars.forwards = false;
                      vars.skip_count = 0;
                      clearInterval(intervale);
                      delete item.dataset.intervale;
                    }
                  }
                }
                vars.part = message.substr(0, vars.offset);
                if (vars.skip_count == 0) {
                  if (vars.forwards) {
                    vars.offset++;
                  }
                }
                item.innerHTML = vars.part;
              },speed);
            },
        },
        /**
         * Log a message to the console with a specified color.
         * @memberof panda.util
         * @function log
         * @param {*} content - Content to log.
         * @param {string} [color="#ff66a5"] - Color of the log text.
         */
        log:function(content, color){
          let message = "";
          let object = false;
          switch(typeof content){
            case "string":
              message = content;
              break;
            case "number":
              message = content.toString();
              break;
            case "bigint":
              message = content.toString();
              break;
            case "boolean":
              message = content.toString();
              break;
            case "symbol":
              message = content.toString();
              break;
            case "undefined":
              message = "undefined";
              break;
            case "object":
              message = JSON.stringify(content, null, 5);
              object = true;
              break;
            case "function":
              message = "function";
              break;
          }
          if(!color){
            color = "#ff66a5";
          }
          var r = [];
          if(!object){
            r = ["%c %c %c log > "+message+" %c ", "background: "+color+"; padding:5px 0;",  "background: "+color+"; padding:5px 0;","color: "+color+"; background: #030307; padding:5px 0;","background: "+color+"; padding:5px 0;"];
          }else{
            let lines = message.split("\n");
            let text = "";
            let maxlength = 5;
            lines.forEach(l => {
              maxlength = maxlength < l.length ? l.length : maxlength;
              maxlength = maxlength%2 == 0 ? maxlength : maxlength + 1;
            });
            lines.forEach(line => {
              if(line.length != maxlength){
                line = line.padEnd(maxlength, " ");
              }
              text+= "%c %c "+line+" %c \n";
            });
            let startmessage = "log : %c ";
            const startspace = ((maxlength-startmessage.length)/2)+startmessage.length;
            let endmessage = "▲▲▲ Log ▲▲▲";
            const endspace = ((maxlength-endmessage.length)/2)+endmessage.length;
            let finalstartmessage = startmessage
              // .padStart(startspace,' ')
              .padEnd(maxlength, ' ');
            let finalendmessage = endmessage
              .padStart(endspace,' ')
              .padEnd(maxlength,' ');
            r.push("%c %c "+""+finalstartmessage+" %c \n"+text);//+"%c %c "+finalendmessage+" %c ");
            r.push("background: "+color+"; padding:5px 0;");
            r.push("color: "+color+"; background: #030307; padding:5px 0;width: 100px;");
            r.push("background: "+color+"; padding:5px 6.5px;");
            r.push("background: "+color+"; padding:5px 0;");
            lines.forEach(() => {
              r.push("background: "+color+"; padding:5px 0;");
              r.push("color: "+color+"; background: #030307; padding:5px 0;");
              r.push("background: "+color+"; padding:5px 0;");
            });
            // r.push("background: "+color+"; padding:5px 0;");
            // r.push("color: "+color+"; background: #030307; padding:5px 0;width: 100px;");
            // r.push("background: "+color+"; padding:5px 0;");
          }
          var e = globalThis.console;
          e.log.apply(e, r);
        },
        /**
         * Generate a random number between min and max.
         * @memberof panda.util
         * @function rdm
         * @param {number} min - Minimum value.
         * @param {number} max - Maximum value.
         * @returns {number} Random number between min and max.
         */
        rdm:function(min,max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        /**
         * Create a new HTML element with specified attributes.
         * @memberof panda.util
         * @function newelem
         * @param {string} type - Type of the HTML element to create.
         * @param {Object} object - Attributes to set on the element.
         * @returns {HTMLElement} The created HTML element.
         */
        newelem:function(type, object){
            var element = document.createElement(type);    
            for(var i in object){
                element[i] = object[i];
            }
            return element;
        },
        /**
         * Convert seconds to HH:MM:SS format.
         * @memberof panda.util
         * @function secondToHHMMSS
         * @param {number} val - Time in seconds.
         * @returns {string} Time in HH:MM:SS format.
         */
        secondToHHMMSS:function(val){
          let texttimer = "";
          let h = Math.floor(val/3600);
          let m = Math.floor((val-(h*3600))/60);
          let s = val-((h*3600)+(m*60));
          if(h <= 0){
              texttimer += "";
          }else if(h < 10){
              texttimer += "0"+h+":";
          }else{
              texttimer += h+":";
          }
          if(m <= 0){
              texttimer += "00:";
          }else if(m < 10){
              texttimer += "0"+m+":";
          }else{
              texttimer += m+":";
          }
          if(s <= 0){
              texttimer += "00";
          }else if(s < 10){
              texttimer += "0"+s;
          }else{
              texttimer += s;
          }
          return texttimer;
        },
        /**
         * Normalize text.
         * @memberof panda.util
         * @function normalize
         * @param {string} text - Text to normalize.
         * @returns {string} Normalized text.
         */
        normalize:function(text){
          return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },
        /**
         * Up-Down item functions.
         * @memberof panda.util
         * @namespace uditem
         */
        uditem: {
          /**
           * Add an up-down item element.
           * @memberof panda.util.uditem
           * @function add
           * @param {HTMLElement} elem - Element to add the up-down item to.
           * @param {*} value - Initial value.
           * @param {Function} fuct - Function to call on value change.
           */
          add:function(elem,value,fuct){
            let ArrowUp = panda.util.newelem("span",{"className":"top","innerHTML":">"});
            let ArrowDown = panda.util.newelem("span",{"className":"bottom","innerHTML":">"});
            elem.appendChild(ArrowUp);
            elem.innerHTML += value;
            elem.appendChild(ArrowDown);
            elem.addEventListener("click",(e)=>{
              if(e.target.className == "top"){
                fuct(elem,"+");
              }else if(e.target.className == "bottom"){
                fuct(elem,"-");
              }
            });
          },
          /**
           * Set the value of an up-down item.
           * @memberof panda.util.uditem
           * @function set
           * @param {HTMLElement} elem - Element to set the value for.
           * @param {*} value - New value.
           */
          set:function(elem,value){
            elem.innerHTML = '<span class="top">&gt;</span>'+value+'<span class="bottom">&gt;</span>';
          },
          /**
           * Get the value of an up-down item.
           * @memberof panda.util.uditem
           * @function get
           * @param {HTMLElement} elem - Element to get the value from.
           * @returns {*} Current value.
           */
          get:function(elem){
            let regex = /<span class="top">&gt;<\/span>(-?\d+)<span class="bottom">&gt;<\/span>/;
            return regex.exec(elem.innerHTML);
          }
        }
    },
    /**
     * Loader functionalities.
     * @memberof panda
     * @namespace loader
     */
    loader: {
      var:{init:false},
      /**
       * Initialize the loader.
       * @memberof panda.loader
       * @function init
       * @param {HTMLElement} loader - Loader element.
       * @param {HTMLElement} menu - Menu element.
       */
      init:function(loader,menu){
        this.var.init = true;
        this.var.loader = loader;
        this.var.menu = menu;
        this.var.loadimage = 0;
        this.var.image = [];
        this.update("show");
        var images = document.querySelectorAll("img, audio");
        if(images.length == 0){
          this.update(50);
          setTimeout(()=>{this.update(100);this.update("hide")},1000)
          
          // this.update("hide");
        }else{
          images.forEach(element => {
            this.new(element,menu);
          });
        }
      },
      /**
       * Set the loader menu.
       * @memberof panda.loader
       * @function setmenu
       * @param {HTMLElement} menu - New menu element.
       */
      setmenu:function(menu){
        this.var.menu = menu;
      },
      /**
       * Add a new item to be loaded.
       * @memberof panda.loader
       * @function new
       * @param {HTMLElement} item - Item to be loaded.
       * @param {HTMLElement} menu - Menu element.
       * @param {string} type - Type of the item (e.g., "css").
       * @param {string} ext - External resource.
       */
      new:function(item,menu,type,ext){
        if(this.init == false){
          console.log("need init(elem loader,elemall menu)");
          return;
        }
        this.var.menu = menu;
        let cheminImage = "";
        if(type == "css"){
          cheminImage = window.getComputedStyle(item).style.background.slice(4, -1).replace(/"/g, "");
          item = new Image();
        }
        if(type == "ext"){
          cheminImage = ext;
          item = new Image();
        }
        
        this.var.image.push(item);
        item.addEventListener("load",(e) => {
          // console.log(e);
          panda.loader.resourceLoaded();
        });
        if(cheminImage != ""){
          item.src = cheminImage;
        }
      },
      /**
       * Called when all resources are loaded.
       * @memberof panda.loader
       * @function resourceLoaded
       */
      resourceLoaded:function(){
        this.var.loadimage++;
        if (this.var.loadimage === this.var.image.length) {
          this.update("hide");
          this.var.image = [];
          this.var.loadimage = 0;
        }else{
          this.update("show");
          // console.log(this.var,Math.round((this.var.loadimage / this.var.image.length) * 100));
          this.update(Math.round((this.var.loadimage / this.var.image.length) * 100));
        }
      },
      /**
       * Update the loader state.
       * @memberof panda.loader
       * @function update
       * @param {string} state - New state ("show", "hide", or progress value).
       */
      update:function(state){
        switch (state) {
          case "show":
            this.var.loader.style.display = "";
            this.var.menu.style.display = "none";
            break;
          case "hide":
            this.var.loader.style.display = "none";
            this.var.menu.style.display = "";
            break;
          default:
            this.var.loader.querySelector('progress').value = state;
            break;
        }
      },
    },
    /**
     * Cookie functionalities.
     * @memberof panda
     * @namespace cookie
     */
    cookie: {
      /**
       * Save a cookie.
       * @memberof panda.cookie
       * @function save
       * @param {Object} parametres - Cookie data.
       * @param {string} emplacement - Cookie name.
       */
      save:function(parametres,emplacement){
        function formatOptions(options) {
          var cookieOptions = '';
        
          // Parcourez toutes les options pour formater la chaîne.
          for (var option in options) {
            if (options.hasOwnProperty(option)) {
              cookieOptions += option + '=' + options[option] + ';';
            }
          }
          return cookieOptions;
        }
        const options = {
          expires: 365,
          path: '/'
        };
        let parametresJSON = JSON.stringify(parametres);
        document.cookie = emplacement+'=' + encodeURIComponent(parametresJSON) + ';' + formatOptions(options);
      },
      /**
       * Read a cookie.
       * @memberof panda.cookie
       * @function read
       * @param {string} emplacement - Cookie name.
       * @returns {Object} Cookie data.
       */
      read:function(emplacement){
        
        var cookies = document.cookie.split(';');
        var parametres = false;
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
      
          if (cookie.indexOf(emplacement+'=') === 0) {
            var parametresJSON = decodeURIComponent(cookie.substring((emplacement+'=').length));
            parametres = JSON.parse(parametresJSON);
            break;
          }
        }
      
        return parametres;
      }
    },
    /**
     * Time action functionalities.
     * @memberof panda
     * @namespace timeaction
     */
    timeaction: {
        memoire:{time:0,list:[],event:null,state:0},
        /**
         * Add a timed action.
         * @memberof panda.timeaction
         * @function add
         * @param {HTMLElement} item - Item for the action.
         * @param {Object} option - Options for the action.
         */
        add:function(item,option){
            if(this.memoire.event === null){
                this.clear();
                this.memoire.list.push({"item":item,"option":option});
                this.initinterval();
            }else{
                if(option.start < this.memoire.time){
                    option.start = this.memoire.time;
                    option.end += this.memoire.time;
                }
                this.memoire.list.push({"item":item,"option":option});
            }
        },
        /**
         * Pause timed actions.
         * @memberof panda.timeaction
         * @function pause
         */
        pause:function(){
          if(this.memoire.state){
            clearInterval(this.memoire.event);
            this.memoire.state = 0;
          }else{
            this.initinterval();
          }
        },
        /**
         * Stop all timed actions.
         * @memberof panda.timeaction
         * @function stop
         */
        stop:function(){
            clearInterval(this.memoire.event);
            this.memoire.state = 0;
            this.clear();
        },
        /**
         * Clear all timed actions.
         * @memberof panda.timeaction
         * @function clear
         */
        clear(){
            this.memoire.time = 0;
            this.memoire.event = null;
            this.memoire.list = [];
        },
        /**
         * Initialize the action interval.
         * @memberof panda.timeaction
         * @function initinterval
         */
        initinterval:function(){
            this.memoire.state = 1;
            this.memoire.event = setInterval(() => {
                const time = this.memoire.time;
                if(this.memoire.list.length == 0){
                    this.stop();
                }
                for (const select of this.memoire.list) {
                    if(select.option.end >= time && select.option.start <= time){
                        for(const i of select.option.list){
                            let timer = (time-select.option.start);
                            let replace = i.init;
                            for (let index = 0; index < timer; index++) {
                                replace += i.add;
                            }
                            let iresult = i.value.replace("&1",replace);
                            select.item[i.action] = iresult;
                        }
                    }else{
                        if(time > select.option.end){
                            const index = this.memoire.list.indexOf(select);
                            if (index !== -1) {
                                
                            }
                        }
                    }
                }
                this.memoire.time = time+1;
            }, 1000);
        }
    },
    /**
     * AJAX functionalities.
     * @memberof panda
     * @namespace ajax
     */
    /**
     * Perform an AJAX request.
     * @memberof panda.ajax
     * @function ajax
     * @param {string} url - Endpoint URL.
     * @param {Object} data - Data to be sent.
     * @param {Function} callback - Callback function for the response.
     */
    ajax:function(url, data , callback){
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function() {
        if (xhr.status === 200) {
          callback(xhr.responseText);
        } else {
          panda.util.log(xhr.responseText,'red');
        }
      }
      var req = '';
      for(var key in data){
        if(req != ''){req += '&';}
        req += key + '=' + encodeURIComponent(data[key]);
      }
      xhr.send(req);
    }
}


var r = ["%c %c %c Pandalib - 0.2.8.2 ✰ 1 ✰  %c  %c  http://www.pandatown.fr/  %c %c ♥%c♥%c♥ ", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
var e = globalThis.console;
e.log.apply(e, r);

export { panda };