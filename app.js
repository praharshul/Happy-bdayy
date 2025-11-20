// app.js
const copyBtn = document.getElementById('copyBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const popupBtn = document.getElementById('popupBtn');
const messageTextEl = document.getElementById('messageText');

const message = messageTextEl.innerText.trim();

// Helper: copy to clipboard
async function copyToClipboard(text){
  try{
    await navigator.clipboard.writeText(text);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Message copied to clipboard',
      showConfirmButton: false,
      timer: 1800
    });
  } catch (e){
    Swal.fire('Copy failed', 'Please select and copy manually', 'error');
  }
}

// Helper: open WhatsApp with prefilled text
function openWhatsApp(text){
  const encoded = encodeURIComponent(text);
  // Use wa.me for both mobile and web; if on desktop it'll open web.whatsapp
  const url = `https://wa.me/?text=${encoded}`;
  window.open(url, '_blank');
}

// Birthday popups sequence
async function showBirthdayPopups(){
  // 1) Big modal
  await Swal.fire({
    title: 'Happy Birthday, Shreya! 🎉',
    html: `<strong>Wishes</strong><br>May your life be filled with success, peace and endless smiles.`,
    showCloseButton: true,
    showCancelButton: false,
    confirmButtonText: 'Thank you',
    backdrop: `
      rgba(0,0,0,0.4)
    `
  });

  // 2) small toast
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: 'Sending a heartfelt message...',
    showConfirmButton: false,
    timer: 1400
  });

  // 3) confetti burst
  runConfetti();

  // 4) show copy/send suggestion
  setTimeout(() => {
    Swal.fire({
      title: 'Ready to share?',
      text: 'Copy the message or open WhatsApp to send it.',
      showCancelButton: true,
      confirmButtonText: 'Open WhatsApp',
      cancelButtonText: 'Copy text'
    }).then((res)=>{
      if(res.isConfirmed){
        openWhatsApp(message);
      } else {
        copyToClipboard(message);
      }
    });
  }, 700);
}

// confetti using canvas-confetti
function runConfetti(){
  // a few randomized bursts
  const duration = 1800;
  const end = Date.now() + duration;

  (function frame(){
    confetti({
      particleCount: 8,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 8,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// event listeners
copyBtn.addEventListener('click', ()=>copyToClipboard(message));
whatsappBtn.addEventListener('click', ()=>openWhatsApp(message));
popupBtn.addEventListener('click', ()=>showBirthdayPopups());

// Optional: auto show popups when page loads (comment/uncomment as desired)
window.addEventListener('load', ()=>{
  // small delay then show
  // setTimeout(showBirthdayPopups, 900);
});
