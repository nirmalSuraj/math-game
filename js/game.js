
(function(){

    addEventListener("load", load_sound);
    //game dit is de hoofd div 
    const game_div=document.querySelector('#game_div');
    //waar alle speel  opties zichtbaar zijn
    const menu=document.querySelector('#menu');
    //in deze div kan jij spelniveau
    const select_level=document.querySelector('#select_level');
    //in deze div kan jij soort spel kiezen
    const select_type=document.querySelector('#select_type');
    //inputwaarde
    const input=document.querySelectorAll('.level'),
          meteoriet=document.querySelector('#meteoriet'),
          fout_houder=document.querySelector("#fout_houder"),
          tips=document.querySelector("#tips"),
          alert_tips=document.querySelector("#alert_tips"),
          reset=document.querySelector("#reset"),
          game_over=document.querySelector("#Game_over"),
          time=document.querySelector('#time');
    //schip
    let schip=document.querySelectorAll('.schip');
    //niveau
    let level;
    //soort spel
    let type_of_game;
    let dly=1,//snelheid op y as
        dlx=2,//snelheid op x as
        dh=[],//individueel positie op y as van schip bijhouden
        dw=[];//individueel positie op x as van schip bijhouden
    let prev,//vorige waarde bij houden in menu_hide funtie
        vhd=[],//lijst van vragen
        antw=[],//lijst van antworden
        generateQ=true,//vragen genereren 
        change_side_H=[],//veranderen richting op y as voor schip{houd boolens bij}
        change_side_W=[],//veranderen richting op x as voor schip{houd boolens bij}
        h=100,//beginpunt op y as
        w=80,//beginpunt op x as
        stel_vraag=true,//vraag mag getoont worden wanneer stel_vraag is true
        teller=0,
        show_schip=true,
        fout_teller=3,//speler krijgt 3 kansen
        hide_tip=false,
        punten=0,//bool gaat er voor zorgen bij klikken op body hide alert_div
        stop=false,//als alles beantwoord is dan wordt deze var true
        src_sound=["sound/shoot.mp3",
                   "sound/intro.mp3",
                   "sound/click.mp3",
                   "sound/error2.mp3",
                   "sound/gameover.mp3",
                   "sound/goodjob.mp3"],
        id=["shoot","intro","click","error2","gameover","goodjob"],
        sec=0,
        min=0,
        timer_start;



    /*************************** get level en get type op game  *********************************************/

    //click op input
    input.forEach(index=>{
        index.addEventListener("click",menu_hide);  

    });
    //functie hide elke menu div na het maken van keuz
    function menu_hide(e){
        play_sound("click")
        //als er klikt wordt op terug 
        if(e.currentTarget.id == "back"){
            //als niveau show
            select_level.style.display='inline-block';
            //hide select type
            select_type.style.display='none'; 
            //leeg prev 
            prev="";

            clearInterval(timer_start)
        }else{
            //level opslaan
            if(select_level.style.display !== "none"){
                //show select type
                level=e.currentTarget.value;

            }
            //als niveau geslecteerd dan hide
            select_level.style.display='none';

            if(select_level.style.display == "none"){
                //show select type
                select_type.style.display='inline-block'; 

            }


            if(prev === 'inline-block'){
                //soort spel opslaan
                type_of_game=e.currentTarget.value;
                //hide select type
                select_type.style.display='none'; 
                //hide div menu
                menu.style.display='none'; 
                timer_start=setInterval(timer,1000);


            }else{
                prev = select_type.style.display;

            }
        }


    }
    /***************************************functie voor level en type_games maken*****************************************/
    //make random reken getallen 
    function get_reken_getal(level,sym){

        if(level == "Level 1" ){

            return Math.floor(Math.random() * (sym !="Tafels"?20: 5));

        }
        if(level == "Level 2" ){

            return Math.floor(Math.random() * (sym!="Tafels"? 60: 5));

        }
        if(level == "Level 3" ){

            return Math.floor(Math.random() * (sym!="Tafels"? 100: 10));

        }



    }



    //antwoord van gebuiker verglijken het antw
    function vergelijk_waarde(e){

        //als als het klik waarde is gelijk aan antwoord dan verwijder deze div 
        if(this.firstElementChild.nextElementSibling.value == Number(meteoriet.firstElementChild.innerHTML)){
            play_sound("shoot");
            show_schip=false;
            this.style.display="none";
            stel_vraag=true;
            //hide alert_div indien zichtbaar is 
            hide_tip_f()
            //optellen hoeveel antworden dat de speler juist heeft
            punten++;

        }else{
            play_sound("error2");
            fout_teller--;
            if(fout_teller >= 0 ){
                fout_houder.firstElementChild.firstElementChild.innerHTML=fout_teller;

            }


            //hide alert_div indien zichtbaar is 
            hide_tip_f()

        }

    }



    //deze functie zorgt voor toonen van vraagde getal en insert tip in tip div
    function meteoriet_f(){
        meteoriet.style.display="inline-block";
        time.style.display="inline-block";
        if(stel_vraag){
            if(teller < 10){
                meteoriet.firstElementChild.innerHTML=antw[teller];  
            }else{
                stop=true;
            }

            alert_tips.innerHTML=vhd[teller];

            teller++;
            stel_vraag=false;
        }

    }

    function vraag(l,symbool){

        if(vhd.length >= 10){
            generateQ=false
        }

        if(vhd.length != 10 && generateQ){
            let holder,
                antwholder,
                eerste =get_reken_getal(l,symbool),
                tweede =get_reken_getal(l,symbool);
            if(symbool == "Optellen"){

                holder=eerste+"+"+tweede;
                antwholder=eerste+tweede;
                vhd.push(holder)
                antw.push(antwholder)


            }
            if(symbool == "Aftrekken"){
                /* om negatieve getallen te vermijden moet wij er voor zorgen dat eerste aftrekgetal kleiner is dan tweede*/

                //als 
                while(eerste < tweede){
                    eerste =get_reken_getal(l,symbool);
                }
                holder=eerste+"-"+tweede;
                antwholder=eerste-tweede;
                vhd.push(holder)
                antw.push(antwholder)

            }

            if(symbool == "Tafels"){
                vhd.push(eerste+"X"+tweede)
                antwholder=eerste*tweede;
                antw.push(antwholder)

            }


        }


    }
    /*******************rest *************************************************************************************************/

    function reset_f(){
        play_sound("click");
        location.reload()

    }

    /*************************************************geef tips***************************************************************/

    function hide_tip_f(){
        if(hide_tip){

            alert_tips.classList.remove("alert_show");
            hide_tip=false;
        }

    }


    //deze functie zorgt voor hide and show van tipdiv 
    function tips_f(e){
        play_sound("click");
        if(e.currentTarget.id == "tips"){

            alert_tips.classList.toggle("alert_show");

            hide_tip=!hide_tip;
        }

    }
    /********************************************create movement******************************************************************/
    let div_heigth,
        div_width;
    /*in deze functie gaan wij begin posties van schip defineren.
   individuele true en false waarde geven voor later richtingen te veranderen
*/
    schip.forEach((index,i)=>{

        div_heigth=h+=80,
            div_width=w+=100;


        index.style.left=div_width+'px';
        index.style.top=div_heigth +'px';



        dh[i]=div_heigth;
        dw[i]=div_width;

        //change_side_W
        if(div_heigth < game_div.offsetHeight-80){
            change_side_H[i]=true;
        }
        if(div_heigth < game_div.offsetWidth-100){
            change_side_W[i]=true;
        }


    });

    /*deze functie dient om bewingin van de schip*/
    function move_schip(){


        schip.forEach((index,i)=>{


            ///up and down
            //als positiewaarde grooter is dan game_div positiewaarde dan optellen op y as anders aftellen
            if(dh[i] <= game_div.offsetHeight &&  change_side_H[i]){

                dh[i]+=dly;

            }else{
                dh[i]-=dly;

            }

            //optellen wanner true aftellen wanner false
            if(dh[i] > game_div.offsetHeight-80){
                change_side_H[i]=false;

            }
            if(dh[i] < 10){
                change_side_H[i]=true;
            }

            ///left and rigth
            //als positiewaarde grooter is dan game_div positiewaarde dan optellen op x as anders aftellen
            if(dw[i] <= game_div.offsetWidth &&  change_side_W[i]){

                dw[i]+=dly;

            }else{
                dw[i]-=dly;

            }

            //optellen wanneer true, aftellen wanner false
            if(dw[i] > game_div.offsetWidth -100){
                change_side_W[i]=false;

            }
            if(dw[i] < 10){
                change_side_W[i]=true;
            }

            if(show_schip){
                index.style.display="block";

            }



            index.style.top=dh[i]+'px';
            index.style.left=dw[i]+'px';

            if(vhd.length <= 10){

                index.firstElementChild.innerHTML=vhd[i];
                index.firstElementChild.nextElementSibling.value=antw[i];


            } 

        })


    }
    /***************************************sound***********************************************************************/
    function load_sound(){

        src_sound.forEach((src,i)=>{

            createjs.Sound.registerSound(src, id[i]);

        })



    }
    function play_sound(id){

        createjs.Sound.play(id);
    }

    /****************************************Game over******************************************************************/
    function game_over_f(){

        let compliment="";
        game_over.style.height="500px";
        game_over.classList.remove('alert_hide');
        game_over.classList.add('alert_show');
        if(punten < 4){
            compliment="bijven oefenen"; 
        }else if(punten > 5){
            compliment="Goed gedaan";
        }else if(punten > 8){
            compliment="Geweldig!";
        }else if(punten == 10){
            id="goodjob";
            compliment="OMG jij hebt alles juist";
        }
        play_sound((punten==10?"goodjob":"gameover"));
        game_over.firstElementChild.firstElementChild.innerHTML=`<br>${punten} op 10  ${compliment} <br>${min}:${sec} min`;
    }


    /******************************************timer**********************************************************************/

    function timer(){

        if(sec >= 60){

            min++
            sec=0;
        }
        if(sec <= 60){
            sec++
        }
        time.firstElementChild.innerHTML=`${min}:${sec} min`;
    }


    /*********************************************************************************************************************/

    function game_time(ev){


        if(fout_teller >= 0 && !stop ){
            window.requestAnimationFrame(game_time)
            //play_sound("intro")

        }else{
            game_over_f()
            clearInterval(timer_start)
        }


        if(level !== undefined && type_of_game !== undefined){
            reset.style.display="inline-block";
            vraag(level,type_of_game)
            move_schip()
            meteoriet_f()


            // 
            schip.forEach((index,i)=>{
                index.addEventListener("mousedown",vergelijk_waarde)

            })
            fout_houder.style.display="inline-block";
            tips.style.display="inline-block";

        }


    }
    //dubbel klik hide alert_tips
    addEventListener("dblclick",hide_tip_f)
    //klik op tips btn togel alert_tips
    tips.addEventListener("click",tips_f)
    //alles naar zijn oorspronkelijk waarde
    reset.addEventListener("click",reset_f)


    game_time()



})()