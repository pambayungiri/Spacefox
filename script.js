let move_speed = 25, grativy = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/dead_soundeffect.wav');
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');
let hapus = document.getElementById("layer1")



let game_state = 'Start';
img.style.display = 'none';
message.style.display = 'none';
message.classList.add('messageStyle');
//asdflkjalsakjfdlk
// message.classList.remove('messageStyle');
// message.innerHTML = '';
//laskjdflkjasdlkfja


let player = localStorage.getItem('player')

let button = document.querySelector(".button")
button.addEventListener("click", () => {
    player = document.querySelector(".player").value
    localStorage.setItem('player', player)
    
  });

  console.log(player);

if (player !== null) {
    console.log("masuk1");
    hapus.style.display = "none"
    message.style.removeProperty("display")
    localStorage.clear();
}

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.roket').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let roket = document.querySelectorAll('.roket');
        roket.forEach((element) => {
            let roket_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();
            if(roket_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < roket_props.left + roket_props.width && bird_props.left + bird_props.width > roket_props.left && bird_props.top < roket_props.top + roket_props.height && bird_props.top + bird_props.height > roket_props.top){
                    game_state = 'End';
                    let kategori = '';
                    if (score_val.innerHTML >= 0 && score_val.innerHTML <= 5) {
                        kategori = 'SKILL ISSUE';
                    } else if (score_val.innerHTML > 5 && score_val.innerHTML <= 10) {
                        kategori = 'OK LAH BRO';
                    } else {
                        kategori = 'TEACH ME SENPAI';
                    }
                    message.innerHTML = '<img src="2023Artboard_3_copySPACE_SHIP.png">' + '<br>' + player + ', SKOR ANDA: ' + score_val.innerHTML + '<br>'+ '<br>' + kategori + "!!!";
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    if(roket_props.right < bird_props.left && roket_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = roket_props.left - move_speed + 'px';
                }
            }
        });

        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/2023Artboard_1SPACE_SHIP.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/2023Artboard_2SPACE_SHIP.png';
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 40){
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;

            let roketInv = document.createElement("img")
            roketInv.src = 'images/spaceRockets_004turn.png';
            roketInv.className = "roket";
            roketInv.style.top = pipe_posi - 70 + 'vh';
            roketInv.style.left = '100vw';

            document.body.appendChild(roketInv);

            let roket = document.createElement("img")
            roket.src = 'images/spaceRockets_004.png';
            roket.className = "roket";
            roket.style.top = pipe_posi + pipe_gap + 'vh';
            roket.style.left = '100vw';
            roket.increase_score = '1';

            document.body.appendChild(roket);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
