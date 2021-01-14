function collapseBurger() {
  var t = document.getElementById("infoD");
  "none" === t.style.display
    ? (t.style.display = "block")
    : (t.style.display = "none");
}
function collapseIcon(t) {
  t.src.match(/more/) ? (t.src = "./img/menu.svg") : (t.src = "./img/more.svg");
}
const name_codes = {
  NGA2843: "Imo",
  NGA2842: "AkwaIbom",
  NGA2841: "Abia",
  NGA2847: "CrossRiver",
  NGA2846: "Benue",
  NGA2845: "Bayelsa",
  NGA2844: "Rivers",
  NGA2865: "Kogi",
  NGA2864: "Kaduna",
  NGA2849: "Kwara",
  NGA2848: "Taraba",
  NGA2861: "Edo",
  NGA2860: "Delta",
  NGA2863: "Ebonyi",
  NGA2862: "Enugu",
  NGA2879: "Kebbi",
  NGA2869: "Kano",
  NGA2868: "Jigawa",
  NGA3470: "FCT",
  NGA2881: "Adamawa",
  NGA2872: "Zamfara",
  NGA2873: "Yobe",
  NGA2867: "Nasarawa",
  NGA2850: "Lagos",
  NGA2851: "Niger",
  NGA2852: "Ogun",
  NGA2853: "Ondo",
  NGA2854: "Ekiti",
  NGA2855: "Osun",
  NGA2856: "Oyo",
  NGA2857: "Anambra",
  NGA2858: "Bauchi",
  NGA2859: "Gombe",
  NGA2870: "Katsina",
  NGA2871: "Sokoto",
  NGA2839: "Borno",
  NGA2866: "Plateau",
};
let allStateData = [];
var matrix_group = document.getElementById("matrix-group");
document.onclick = function (t) {
  matrix_group.contains(t.target) || (state_stats.style.display = "none");
};
var state_stats = document.getElementById("state_stats");
const allStatePath = document.getElementsByClassName("states_shapes");
for (let t = 0; t < allStatePath.length; t++) {
  const e = allStatePath[t],
    a = function (t) {
      e !== document.elementFromPoint(t.clientX, t.clientY) &&
        (state_stats.style.display = "none");
    },
    n = function (t) {
      const a = e.getAttribute("id");
      currentStateData = allStateData.find((t) => t.state === name_codes[a]);
      var n = currentStateData
          ? currentStateData.confirmedCases.toLocaleString("en")
          : 0,
        s = currentStateData
          ? currentStateData.casesOnAdmission.toLocaleString("en")
          : 0,
        o = currentStateData
          ? currentStateData.discharged.toLocaleString("en")
          : 0;
      (document.getElementById("stateName").innerHTML = name_codes[a]),
        (document.getElementById(
          "stateTotalConfirmedCase"
        ).innerHTML = currentStateData ? n : 0),
        (document.getElementById(
          "stateTotalActiveCases"
        ).innerHTML = currentStateData ? s : 0),
        (document.getElementById("stateDischarged").innerHTML = currentStateData
          ? o
          : 0),
        (document.getElementById("stateTotalDeath").innerHTML = currentStateData
          ? currentStateData.death
          : 0),
        (state_stats.style.display = "block");
      var r = t.pageX + 15,
        c = t.pageY - 75;
      state_stats.classList.remove("right");
      var i = state_stats.getBoundingClientRect();
      r + i.width > window.innerWidth &&
        ((r = t.pageX - i.width - 15), state_stats.classList.add("right")),
        (state_stats.style.left = r + "px"),
        (state_stats.style.top = c + "px");
    };
  (e.onmouseout = a),
    (e.onmouseover = n),
    (e.ontouchstart = n),
    (e.ontouchstart = a),
    (e.onclick = n);
}
function setStateBackground(t) {
  for (let e = 0; e < allStatePath.length; e++) {
    const a = allStatePath[e],
      n = a.getAttribute("id");
    (currentStateData = t.find((t) => t.state === name_codes[n])),
      currentStateData && currentStateData.casesOnAdmission <= 10
        ? a.classList.add("_10")
        : currentStateData && currentStateData.casesOnAdmission <= 50
        ? a.classList.add("_50")
        : currentStateData && currentStateData.casesOnAdmission <= 100
        ? a.classList.add("_100")
        : currentStateData && currentStateData.casesOnAdmission <= 200
        ? a.classList.add("_200")
        : currentStateData && currentStateData.casesOnAdmission <= 500
        ? a.classList.add("_500")
        : currentStateData && currentStateData.casesOnAdmission <= 999
        ? a.classList.add("_900")
        : currentStateData && currentStateData.casesOnAdmission >= 1e3
        ? a.classList.add("_1000")
        : a.classList.add("_10");
  }
}
function appendData(t) {
  var e = t.totalConfirmedCases.toLocaleString("en"),
    a = t.totalActiveCases.toLocaleString("en"),
    n = t.death.toLocaleString("en"),
    s = parseInt(t.totalSamplesTested.replace(/,/g, ""), 10).toLocaleString(
      "en"
    ),
    o = t.discharged.toLocaleString("en");
  (totalActiveCase = document.getElementById("totalActiveCases")),
    totalActiveCase && (totalActiveCase.innerHTML = a),
    (totalCasesC = document.getElementById("totalConfirmedCases")),
    totalCasesC && (totalCasesC.innerHTML = e),
    (totalCasesCc = document.getElementById("totalConfirmedCase")),
    totalCasesCc && (totalCasesCc.innerHTML = e),
    (totalDeat = document.getElementById("totalDeath")),
    totalDeat && (totalDeat.innerHTML = n),
    (totalSamplesTest = document.getElementById("totalSamplesTested")),
    totalSamplesTest && (totalSamplesTest.innerHTML = s),
    (discharge = document.getElementById("discharged")),
    discharge && (discharge.innerHTML = o),
    setStateBackground((allStateData = t.states)),
    setSideNavList(allStateData);
}
function setSideNavList(t) {
  var e = document.getElementById("areaAlls");
  t.sort(function (t, e) {
    return e.casesOnAdmission - t.casesOnAdmission;
  });
  for (var a = 0; a < t.length; a++) {
    var n = t[a].state,
      s = t[a].casesOnAdmission.toLocaleString("en"),
      o = (t[a].discharged, document.createElement("div"));
    o.className = "areaDiv";
    var r = document.createElement("div");
    (r.id = n), (r.className = "areaAll");
    var c = document.createElement("div");
    (c.className = "areaAllName"), (c.title = n), (c.innerHTML = n);
    var i = document.createElement("div");
    (i.className = "areaAllCount"),
      (i.innerHTML = s),
      o.appendChild(r),
      r.appendChild(c),
      r.appendChild(i),
      e && e.appendChild(o);
  }
}
var eventsHandler;
fetch("https://covidnigeria.herokuapp.com/api")
  .then(function (t) {
    return t.json();
  })
  .then(function (t) {
    (document.getElementById("loader").style.display = "none"),
      appendData(t.data);
  })
  .catch(function (t) {
    console.log("error: " + t);
  });
var panZoom = svgPanZoom("#map_format", {
  zoomEnabled: !0,
  controlIconsEnabled: !1,
  center: !0,
  zoomScaleSensitivity: 0.4,
  customEventsHandler: (eventsHandler = {
    haltEventListeners: [
      "touchstart",
      "touchend",
      "touchmove",
      "touchleave",
      "touchcancel",
    ],
    init: function (t) {
      var e = t.instance,
        a = 1,
        n = 0,
        s = 0;
      (this.hammer = Hammer(t.svgElement, {
        inputClass: Hammer.SUPPORT_POINTER_EVENTS
          ? Hammer.PointerEventInput
          : Hammer.TouchInput,
      })),
        this.hammer.get("pinch").set({ enable: !0 }),
        this.hammer.on("doubletap", function (t) {
          e.zoomIn();
        }),
        this.hammer.on("panstart panmove", function (t) {
          "panstart" === t.type && ((n = 0), (s = 0)),
            e.panBy({ x: t.deltaX - n, y: t.deltaY - s }),
            (n = t.deltaX),
            (s = t.deltaY);
        }),
        this.hammer.on("pinchstart pinchmove", function (t) {
          "pinchstart" === t.type &&
            ((a = e.getZoom()),
            e.zoomAtPoint(a * t.scale, { x: t.center.x, y: t.center.y })),
            e.zoomAtPoint(a * t.scale, { x: t.center.x, y: t.center.y });
        }),
        t.svgElement.addEventListener("touchmove", function (t) {
          t.preventDefault();
        });
    },
    destroy: function () {
      this.hammer.destroy();
    },
  }),
  beforeZoom: function () {
    state_stats.style.display = "none";
  },
  beforePan: function () {
    state_stats.style.display = "none";
  },
});
window.addEventListener("resize", function (t) {
  t.preventDefault(), panZoom.resize(), panZoom.fit(), panZoom.center();
}),
  document.getElementById("zoom-in").addEventListener("click", function (t) {
    t.preventDefault(), panZoom.zoomIn();
  }),
  document.getElementById("zoom-out").addEventListener("click", function (t) {
    t.preventDefault(), panZoom.zoomOut();
  }),
  document.getElementById("reset").addEventListener("click", function (t) {
    t.preventDefault(), panZoom.resetZoom(), panZoom.center();
  }),
  (window.onresize = function () {
    document.getElementById("infoD").style.display = "block";
  });
