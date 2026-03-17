// Volume
document.getElementById("volSlider").addEventListener("input", e => {
  const v = parseInt(e.target.value);
  document.getElementById("volPct").textContent = v + "%";
  document.getElementById("volPct").style.color = v > 100 ? "#ff6b6b" : "#a76cff";
  // apply to your AudioContext gainNode: gainNode.gain.value = v / 100;
});

// Overdrive button
document.getElementById("overdriveBtn").addEventListener("click", () => {
  const s = document.getElementById("volSlider");
  s.max = 400; s.value = 400;
  s.dispatchEvent(new Event("input"));
 
});


window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("fade");
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("main").classList.add("visible");
    }, 520);
  }, 800); // adjust delay to match your actual asset load time
});
