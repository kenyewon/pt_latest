$(document).ready(function(){


  // 메뉴 클릭 이벤트
  var menu = $(".gnb li, .m-gnb li")

  menu.click(function(){
      event.preventDefault();
      var idx = $(this).index();
      var Link = $(this).find("a").attr("href");
      var tt = $(Link).offset().top
      $("html, body").stop()
      .animate({scrollTop:tt},1000,"swing",function(){
          quick(idx);
      })
  });

  function quick(n){
  $(".gnb li").removeClass("on");
  $(".gnb li").eq(n).addClass("on");
  }

  // 페이지 상단으로 이동
  $(".go-top, .intro").click(function(){
    $("html, body").stop().animate({scrollTop:0},1000,"swing")
  });

  // 마우스 휠 방향
  $(window).bind('wheel', function(event){
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        // scroll up
        $("header").removeClass("on");
    }
    else {
        // scroll down
        $("header").addClass("on");
    }

    var location = $(window).scrollTop();
    
    if(location < 100 ){
      $("header").addClass("on");
    }
  });


  // 가로 스크롤 애니
  const horizontal = document.querySelector(".horizontal"); 
    const sections = gsap.utils.toArray(".horizontal > section");

    gsap.to(sections, {
        xPercent: -100 * (sections.length -1),
        ease: "none",
        scrollTrigger: {
            trigger: horizontal,
            start: "top top",
            end: () => "+=" + (horizontal.offsetWidth - innerWidth),
            pin: true,
            scrub: 1,
            snap: {
                snapTo: 1/(sections.length -1),
                inertia: false,
                duration: {min: 0.1, max: 0.1},
            },
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });

    //흐르는 텍스트
    function createLoopingText(el) {
        const lerp = (current, target, factor) => current * (1 - factor) + target * factor;
      
        const state = {
          el, 
          lerp: {
            current: 0,
            target: 0 
          },
          interpolationFactor: 0.1,
          speed: 0.1, 
          direction: -1
        };
        
        state.el.style.cssText = 'position: relative; display: inline-flex; white-space: nowrap;';
        state.el.children[1].style.cssText = `position: absolute; left: ${100 * -state.direction}%;`;
      
        
        function animate() {
          state.lerp.target += state.speed;
          state.lerp.current = lerp(state.lerp.current, state.lerp.target, state.interpolationFactor);
      
          if (state.lerp.target > 100) {
            state.lerp.current -= state.lerp.target;
            state.lerp.target = 0;
          }
      
          const x = state.lerp.current * state.direction;
          state.el.style.transform = `translateX(${x}%)`;
        }
      
        function render() {
          animate();
          window.requestAnimationFrame(render);
        }
      
        render();
        return state;
      }
      
      document.querySelectorAll('.flex').forEach(el => createLoopingText(el));




      //커서 포인터
      const cursorParent = document.getElementById('mouse-cursor')
      const cursorChild = cursorParent.children[0]
      window.addEventListener('mousemove', mousemove)
      window.addEventListener('mousedown', mousedown)
      window.addEventListener('mouseup', mouseup)
  
      let scale = 1
      let stage = ''
      let carouselDirection = ''
      let cursorX = 0, cursorY = 0
      function mousemove(e) {
        cursorX = e.pageX - cursorParent.offsetWidth / 2
        cursorY = e.pageY - cursorParent.offsetHeight / 2
        cursorParent.style.transform =
          `translate3d(${cursorX}px, ${cursorY}px, 0)`
  
        switch(e.target.getAttribute('data-cursor')) {
          case 'carousel':
            carouselDirection = cursorX < innerWidth / 2 ? 'Prev' : 'Next'
            cursorChild.setAttribute('data-name', carouselDirection)
            if (stage === 'carousel') return
            scale = 5
            stage = 'carousel'
            cursorParent.className = 'cursor-text-mode'
            break
          case 'link':
            if (stage === 'link') return
            scale = 5
            stage = 'link'
            cursorChild.setAttribute('data-name', e.target.getAttribute('data-name'))
            cursorParent.className = 'cursor-text-mode'
            break
          case 'img':
            if (stage === 'img') return
            scale = 1
            stage = 'img'
            cursorChild.setAttribute('data-name', '')
            cursorParent.className = ''
            break
          default:
            if (stage === '') return
            scale = 1
            stage = ''
            cursorChild.setAttribute('data-name', '')
            cursorParent.className = ''
            break
        }
        cursorChild.style.setProperty('--cursor-scale', scale)
      }
      function mousedown(e) {
        scale *= 0.8
        cursorChild.style.setProperty('--cursor-scale', scale)
      }
      function mouseup(e) {
        scale *= 1.25
        cursorChild.style.setProperty('--cursor-scale', scale)
      }

});