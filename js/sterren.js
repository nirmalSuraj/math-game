   
   (function(){
       //var

            const sky=document.querySelector("#game_div"),
                  star=200;
            let clssStar,//class element van toegevoegde div via js 
                rw=[],//elke random positie van ster op x-as 
                rh=[],//elke random positie van ster op y-as
                opac=[],//elke individueel helderheid van elke ster
                control=[],/*controle of dat ze hun elke uiterste helderheid bereikt hebben met true of false*/
          
                stop,
                dag=false;


            //elke positie, helderheid word hier aangemaakt 

            function divs(e){


                for(let i = 0 ; i < star; i++){

                    rw [i]= Math.floor(Math.random() * (sky.offsetWidth-10));
                    rh[i]=Math.floor(Math.random() * (sky.offsetHeight-10));
                    opac[i]=Math.random() * 0.9;
                    control[i]=true;

                    sky.innerHTML += "<div class='ster' id='ster"+i+"'></div>";


                }

                classStar=document.querySelectorAll(".ster");


            }

           

            divs();



            function stars(){

                for(let i = 0 ; i < classStar.length; i++){
                    /*als helderheid boven de 0.9 is 
                     control false
                   */ 

                    if(opac[i] > 0.9){

                        control[i]=false;
                    }

                    if(control[i] == false){

                        opac[i]-=0.01;

                        /*als opac zijn minimum waarde berijkt heeft dan control is true */
                        if(opac[i] < 0.04){

                            control[i]=true;

                        }

                    }

                    // als helderheid is kleiner dan 0.9 en control is true
                    if(opac[i] < 0.9 && control[i]){

                        opac[i] +=0.01;

                    }


                    classStar[i].style.left=rw[i]+"px";
                    classStar[i].style.top=rh[i]+"px";
                    classStar[i].style.opacity=opac[i];
                    if(!dag){
                        classStar[i].style.backgroundColor="#ffffff";
                    }else{
                        classStar[i].style.backgroundColor="#00AAE4";
                    }


                }
            }

            function verander(){
                dag=!dag;
                if(dag){

                    butto.innerHTML="avond";
                    sky.style.backgroundColor="#00AAE4";

                }
                if(!dag){
                    go();
                    sky.style.backgroundColor="#252850";
                    butto.innerHTML="dag";
                }

            }
            
            

            function go(){


                if(!dag){

                    window.requestAnimationFrame(go);
                }

                stars();

            }

            go()


         






       
   })()
   
   