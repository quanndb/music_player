const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)

const heading=$('header h2')
const cdthumb=$('.cd-thumb')
const audio=$('#audio')

const nextBtn=$('.btn-next')
const prevBtn=$('.btn-prev')


const app ={
    currentIndex: 0,
    isPlaying: false,
    //list songs
    songs:[
        {
            name: 'love08',
            singer: 'duonggg',
            image: 'https://i.ytimg.com/vi/6MqlA6KeMMo/maxresdefault.jpg',
            path: './mp3/love08.mp3'
        },
        {
            name: 'lost',
            singer: 'obito',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2020/09/24/5/9/f/e/1600916104086_640.jpg',
            path: './mp3/lost.mp3'
        },
        {
            name: 'moonlight',
            singer: 'ariana grande',
            image: 'https://happymag.tv/wp-content/uploads/2022/03/The-Quarry-logo-870x524.jpg',
            path: './mp3/moonlight.mp3'
        },
        {
            name: 'vaicaunoicokhiennguoithaydoi',
            singer: 'GreyD x tlinh',
            image: 'https://i.ytimg.com/vi/2iidlwQ-NfU/maxresdefault.jpg',
            path: './mp3/vc.mp3'
        },
        {
            name: 'ta còn đây',
            singer: 'Justatee x Rhymastic',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/a/e/d/6/aed68e51237ad706f2a5c45d089ee525.jpg',
            path: './mp3/tcd.mp3'
        },
        {
            name: 'Ghost',
            singer: 'Justin Bieber',
            image: 'https://i1.sndcdn.com/artworks-qefDi0LXjvwVrAKJ-W9Ixsw-t500x500.jpg',
            path: './mp3/ghost.mp3'
        },
        {
            name: 'Đoạn tuyệt nàng đi',
            singer: 'lợn rồ',
            image: 'https://i.ytimg.com/vi/x6M6U6DBJLA/maxresdefault.jpg',
            path: './mp3/dt.mp3'
        }
    ],
    
    //render view
    render: function(){
        const htmls= this.songs.map(song=>{
            return`
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        $('.playlist').innerHTML=htmls.join('')

    },

    //defineProperties
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    
    //handle
    handleEvents: function(){
        const _this=this
        //cdThumb
        const cd=$('.cd')
        const cdwidth=cd.offsetWidth
        document.onscroll = function(){
            const scrolltop=window.scrollY || document.documentElement.scrollTop
            const newWidth=cdwidth-scrolltop
            cd.style.width= newWidth >0 ? newWidth+'px' : 0;
            cd.style.opacity= newWidth/cdwidth;
        }
        //clickPlay
        const playBtn=$('.btn-toggle-play')
        const player=$('.player')
        /////////////////////////////////
        const cdThumbAnimate=cdthumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration:10000,
            iterations: Infinity,
        })
        cdThumbAnimate.pause()
        ////////////////////////////
        playBtn.onclick=function(){
            if(_this.isPlaying){              
                audio.pause()     
            }else{
                audio.play()
            }
        }
        audio.onplay=function(){
             player.classList.add('playing')
             _this.isPlaying=true
             cdThumbAnimate.play()
        }
        audio.onpause=function(){
            _this.isPlaying=false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        //position of song
        audio.ontimeupdate=function(){
            let audioDuaration=audio.duration
            const progress=$('.progress')
            if(audio.duration){
               const progressPercent=(audio.currentTime*100/audioDuaration)
               progress.value=(progressPercent)
               progress.style.backgroundSize=(progressPercent)+'%'
            }
        }
        //seek
        progress.onchange=function(e){
            const seekTime=audio.duration*e.target.value/100
            audio.currentTime=seekTime
        }

        //nextSong
        nextBtn.onclick=function(){
            _this.nextSong()
            audio.play()
        }
        //prevSong
        prevBtn.onclick=function(){
            _this.prevSong()
            audio.play()
        }
    },

    //loadCurrentSong
    loadCurrentSong: function(){
        heading.textContent= this.currentSong.name
        cdthumb.style.backgroundImage= `url('${this.currentSong.image}')`
        audio.src= this.currentSong.path
    },

    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex>=this.songs.length){
            this.currentIndex=0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex<0){
            this.currentIndex=this.songs.length-1
        }
        this.loadCurrentSong()
    },

    //run app
    start: function(){
        this.defineProperties()

        this.handleEvents()

        this.loadCurrentSong()

        this.render()
    }
}

app.start()

