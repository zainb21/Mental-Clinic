// Menu, years, appointments and reviews slider
document.addEventListener('DOMContentLoaded', function(){
  const sideMenu = document.getElementById('side-menu');
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-menu');
  const years = document.querySelectorAll('#year, #year2, #year3');
  if(years) years.forEach(y => y.textContent = new Date().getFullYear());

  if(menuBtn && sideMenu){
    menuBtn.addEventListener('click', function(){ sideMenu.classList.toggle('open'); });
  }
  if(closeBtn) closeBtn.addEventListener('click', ()=> sideMenu.classList.remove('open'));

  // Appointment form logic (validation + localStorage)
  const form = document.getElementById('appointmentForm');
  const listContainer = document.getElementById('list-container');
  const viewBtn = document.getElementById('view-appointments');
  const msg = document.getElementById('message');

  function renderAppointments(){
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    if(!listContainer) return;
    listContainer.innerHTML = '';
    if(appointments.length === 0){
      listContainer.innerHTML = '<p>No appointments yet.</p>';
      return;
    }
    appointments.forEach((a, idx) => {
      const div = document.createElement('div');
      div.className = 'appointment-item';
      div.innerHTML = `<strong>${a.name}</strong> <div>${a.date} • ${a.therapist}</div><div>${a.phone}</div><p>${a.notes || ''}</p><button data-id="${idx}" class="btn remove">Remove</button>`;
      listContainer.appendChild(div);
    });
    document.querySelectorAll('.btn.remove').forEach(btn=> btn.addEventListener('click', function(){
      const id = Number(this.dataset.id);
      let appts = JSON.parse(localStorage.getItem('appointments') || '[]');
      appts.splice(id,1);
      localStorage.setItem('appointments', JSON.stringify(appts));
      renderAppointments();
    }));
  }

  if(viewBtn) viewBtn.addEventListener('click', renderAppointments);

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const age = document.getElementById('age').value.trim();
      const date = document.getElementById('date').value;
      const therapist = document.getElementById('therapist').value;
      const notes = document.getElementById('notes').value.trim();

      if(name === '' || phone === '' || date === '' || therapist === ''){
        if(msg) msg.textContent = 'Please fill required fields: name, phone, date and therapist.';
        return;
      }
      const digits = phone.replace(/\D/g,'');
      if(digits.length < 7){ if(msg) msg.textContent = 'Enter a valid phone number.'; return; }
      const selected = new Date(date); const today = new Date(); today.setHours(0,0,0,0);
      if(selected < today){ if(msg) msg.textContent = 'Choose a future date.'; return; }

      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push({name, phone, age, date, therapist, notes});
      localStorage.setItem('appointments', JSON.stringify(appointments));
      if(msg) msg.textContent = 'Appointment reserved successfully ✓';
      form.reset(); renderAppointments();
    });
  }
  renderAppointments();

  // Reviews slider simple logic
  const reviews = document.querySelectorAll('.review-card');
  let current = 0;
  function showReview(index){
    reviews.forEach((r,i)=>{
      r.classList.toggle('active', i===index);
    });
  }
  document.getElementById('next')?.addEventListener('click', ()=>{
    current = (current + 1) % reviews.length; showReview(current);
  });
  document.getElementById('prev')?.addEventListener('click', ()=>{
    current = (current - 1 + reviews.length) % reviews.length; showReview(current);
  });
  // auto-rotate reviews
  setInterval(()=>{ current = (current + 1) % reviews.length; showReview(current); }, 6000);
});

document.addEventListener('DOMContentLoaded', () => {

  // ===== menu =====
  const menuBtn = document.getElementById('menu-btn');
  const sideMenu = document.getElementById('side-menu');
  const closeMenu = document.getElementById('close-menu');

  if (menuBtn && sideMenu && closeMenu) {
    menuBtn.addEventListener('click', () => {
      sideMenu.classList.add('open');
    });

    closeMenu.addEventListener('click', () => {
      sideMenu.classList.remove('open');
    });
  }

  // ===== year =====
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ===== reviews slider =====
  const reviews = document.querySelectorAll('.review-card');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  if (reviews.length > 0 && nextBtn && prevBtn) {

    let currentIndex = 0;

    function showReview(index) {
      reviews.forEach(r => r.classList.remove('active'));
      reviews[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % reviews.length;
      showReview(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
      showReview(currentIndex);
    });
  }

});