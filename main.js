/* ==========================================================================
   ROOT RITUALS — shared behaviour
   ========================================================================== */
(function(){
  "use strict";
  var d = document;
  d.documentElement.classList.remove("no-js");
  d.documentElement.classList.add("js");
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- header collapse ---- */
  var header = d.getElementById("header");
  function headerState(){ if(header) header.classList.toggle("stuck", scrollY > 60); }
  headerState();

  /* ---- mobile menu ---- */
  var burger = d.getElementById("burger"), menu = d.getElementById("mobileMenu");
  if(burger && menu){
    burger.addEventListener("click", function(){
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      d.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded","false");
        d.body.style.overflow = "";
      });
    });
    addEventListener("keydown", function(e){
      if(e.key === "Escape" && menu.classList.contains("open")) burger.click();
    });
  }

  /* ---- reveal on scroll ---- */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold:.12, rootMargin:"0px 0px -7% 0px" });
  d.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });

  /* ---- real photo beats CSS fallback ----
     The CSS bottle/jar renders are placeholders. When a real product photo
     loads we flag its container so the fallback is removed entirely — layering
     them with z-index alone let the fake label paint over the photograph. */
  function claim(img){
    var box = img.closest(".pdp-visual, .also-vis, .pcard-media, .gal-main");
    if(box) box.classList.add("has-photo");
  }
  d.querySelectorAll(".pdp-photo, .also-photo, .pcard-photo, .gal-photo").forEach(function(img){
    if(img.complete && img.naturalWidth > 0) claim(img);
    else img.addEventListener("load", function(){ claim(img); });
  });

  /* ---- hero parallax ---- */
  var heroImg = d.getElementById("heroImg"), hero = d.querySelector(".hero"), ticking = false;
  function frame(){
    ticking = false; headerState();
    if(heroImg && hero && !reduce){
      var h = hero.offsetHeight, y = Math.min(scrollY, h);
      heroImg.style.transform = "translate3d(0," + (y * 0.16).toFixed(1) + "px,0)";
    }
  }
  addEventListener("scroll", function(){ if(!ticking){ ticking = true; requestAnimationFrame(frame); } }, { passive:true });
  frame();

  /* ---- product gallery ---- */
  var galMain = d.getElementById("galMain");
  if(galMain){
    d.querySelectorAll(".gal-thumb").forEach(function(t){
      t.addEventListener("click", function(){
        d.querySelectorAll(".gal-thumb").forEach(function(x){ x.setAttribute("aria-selected","false"); });
        t.setAttribute("aria-selected","true");
        galMain.style.opacity = "0";
        setTimeout(function(){
          galMain.src = t.dataset.full;
          galMain.alt = t.dataset.alt || galMain.alt;
          galMain.style.opacity = "1";
        }, 180);
      });
    });
  }

  /* ---- the twelve herbs ---- */
  var herbs = [
    {n:"Amla",l:"Phyllanthus emblica",c:"oklch(0.60 0.11 135)",r:"Root strength",img:"1656281582490-d55e53cec974",
     alt:"A dense pile of fresh green amla, Indian gooseberries",
     d:"The backbone of the blend and one of the richest natural sources of vitamin C. Amla feeds the follicle directly — strengthening the root, deepening natural colour and slowing premature greying."},
    {n:"Reetha",l:"Soapnut · Sapindus",c:"oklch(0.52 0.07 62)",r:"Natural cleansing",img:"1543376798-62217a8d85cc",
     alt:"Ground reddish-brown herbal powder in a small dish with dried leaves",
     d:"Nature's own surfactant. The saponins in reetha lift oil, dust and buildup off the scalp without the harsh strip of a sulphate — clean, but never squeaky."},
    {n:"Shikakai",l:"Acacia concinna",c:"oklch(0.50 0.07 105)",r:"Conditioning",img:"1509156396595-449e10c5cd3e",
     alt:"Bunches of dried botanicals hanging to cure against a pale wall",
     d:"Reetha's traditional partner, and rich in vitamins A, C, D, E and K. It conditions and detangles while it cleans, keeping the scalp's natural pH intact instead of stripping it."},
    {n:"Hibiscus",l:"Gudhal · H. rosa-sinensis",c:"oklch(0.52 0.15 15)",r:"Growth & shine",img:"1567990989224-6441e1483ac8",
     alt:"A deep red hibiscus flower in full bloom against dark foliage",
     d:"Dense in amino acids and natural mucilage. Hibiscus is the herb most associated with thicker regrowth — it smooths the cuticle for genuine shine and revives hair gone dull."},
    {n:"Rosemary",l:"Salvia rosmarinus",c:"oklch(0.55 0.09 155)",r:"Circulation",img:"1607721098274-e54cbfab475d",
     alt:"A single sprig of fresh rosemary laid flat",
     d:"The most researched herb in the bottle. In a 2015 randomised trial it matched 2% minoxidil on hair count over six months, with less scalp itching. It works by driving circulation at the root."},
    {n:"Methi Dana",l:"Fenugreek · Trigonella",c:"oklch(0.72 0.13 85)",r:"Anti hair-fall",img:"1640671511581-0cc93ea3ebf2",
     alt:"Fenugreek sprouting into dense green microgreens from seed",
     d:"Loaded with protein and nicotinic acid — precisely the two things weak, shedding hair tends to lack. Methi does much of the heavy lifting against hair fall and flaking."},
    {n:"Kalonji",l:"Black Seed · Nigella sativa",c:"oklch(0.34 0.03 260)",r:"Follicle repair",img:"1608797179015-0f64ad48744b",
     alt:"A neat mound of black nigella seeds",
     d:"Prized for thymoquinone, its active compound. Kalonji calms inflammation at the scalp — and inflammation is often what quietly stalls a follicle before it stops producing."},
    {n:"Neem",l:"Azadirachta indica",c:"oklch(0.58 0.11 150)",r:"Scalp health",img:"1669574753113-6442f2cc69b7",
     alt:"Fresh neem leaves on the branch, backlit by daylight",
     d:"Naturally antibacterial and antifungal. Neem is what clears stubborn dandruff and settles the itching that keeps a scalp too irritated to grow hair properly."},
    {n:"Aloe Vera",l:"Ghikwar · Aloe barbadensis",c:"oklch(0.72 0.10 140)",r:"Hydration",img:"1509423350716-97f9360b4e09",
     alt:"A potted aloe plant with thick, water-filled leaves",
     d:"Enzyme-rich and deeply hydrating. Aloe balances scalp pH and seals moisture into the strand — the difference between hair that's dry and hair that snaps."},
    {n:"Tea Leaves",l:"Camellia sinensis",c:"oklch(0.42 0.05 130)",r:"Antioxidant",img:"1582650859079-ee63913ecb84",
     alt:"Young green tea leaves growing on the bush",
     d:"A traditional final rinse across South Asia. The antioxidants shield the strand from everyday oxidative damage while adding softness and quiet depth of colour."},
    {n:"Clove",l:"Laung · Syzygium aromaticum",c:"oklch(0.40 0.06 55)",r:"Stimulant",img:"1581600140682-d4e68c8cde32",
     alt:"Warm-toned whole spices including clove and star anise",
     d:"A warming stimulant, used sparingly and deliberately. Clove lifts circulation at the root alongside rosemary, and gives the tonic its warm, unmistakably herbal finish."},
    {n:"Ber & Harar",l:"Jujube & Haritaki",c:"oklch(0.50 0.08 70)",r:"Traditional tonic",img:"1676887797124-2e5e1e23c837",
     alt:"Ripe red ber, jujube fruit, hanging on the branch",
     d:"The two oldest names on the label. Both are classical strengthening tonics — they cleanse the scalp, fortify the strand, and round the blend into something that feels complete."}
  ];

  var grid = d.getElementById("herbGrid");
  if(grid){
    var IMG = "https://images.unsplash.com/photo-", Q = "?auto=format&fit=crop&w=1400&q=85";
    herbs.forEach(function(h,i){
      var c = d.createElement("article");
      c.className = "herb-card"; c.tabIndex = 0;
      c.setAttribute("data-tilt",""); c.setAttribute("data-tilt-max","11");
      c.innerHTML = '<div class="herb-media">' +
          '<img src="' + IMG + h.img + Q + '" alt="' + h.alt + '" loading="lazy" decoding="async">' +
          '<div class="veil"></div><div class="tint" style="background:' + h.c + '"></div>' +
        '</div>' +
        '<span class="role">' + h.r + '</span>' +
        '<div class="in3d"><div class="num">' + String(i+1).padStart(2,"0") + ' / 12</div>' +
        '<h3>' + h.n + '</h3><div class="lat">' + h.l + '</div><p class="desc">' + h.d + '</p></div>';
      grid.appendChild(c);
    });
  }

  /* ---- 3D tilt ---- */
  if(matchMedia("(hover:hover)").matches && !reduce){
    d.querySelectorAll("[data-tilt]").forEach(function(el){
      var max = parseFloat(el.getAttribute("data-tilt-max")) || 10, raf = null, rx = 0, ry = 0;
      function apply(){ raf = null; el.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)"; }
      el.addEventListener("pointermove", function(e){
        var r = el.getBoundingClientRect();
        ry = ((e.clientX - r.left) / r.width - 0.5) * max * 2;
        rx = -((e.clientY - r.top) / r.height - 0.5) * max * 2;
        if(!raf) raf = requestAnimationFrame(apply);
      });
      el.addEventListener("pointerleave", function(){
        if(raf){ cancelAnimationFrame(raf); raf = null; }
        el.style.transform = "";
      });
    });
  }
})();
