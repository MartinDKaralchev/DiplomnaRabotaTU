class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="footer-col">
            <h3>Връзки</h3>
            <li><a href="index.html">Начало</a></li>
            <li><a href="about.html">За нас</a></li>
            <li><a href="blog.html">Статии</a></li>
            <li><a href="course.html">Курсове</a></li>
            <li><a href="contact.html">Контакти</a></li>
         </div>
         <div class="footer-col">
            <h3>Полезни линкове</h3>
            <li><a href="faq.html">Често задавани въпроси</a></li>
            <li><a href="policy.html">Общи условия</a></li>
            <li><a href="gdpr.html">Лични данни</a></li>
         </div>
         <div class="footer-col">
            <h3>БЮЛЕТИН</h3>
            <p>Не се притеснявай, не изпращаме спам.</p>
            <div class="subscribe">
                <input type="text" placeholder="Електронна поща" >
                <a href="#" class="yellow">Абонирай се</a>
            </div>
         </div>
         <div class="copyright">
            <p>© RoboTech Всички права запазени</p>
            <div class="pro-link">
                <i onclick="window.open('https://www.facebook.com/RoboTechkj')" class="fab fa-facebook-f"></i>
                <i onclick="window.open('https://www.instagram.com/robotech.kj')"class="fab fa-instagram"></i>
                <i onclick="window.open('https://bg.linkedin.com/in/martin-karalchev-0a2776205?trk=people-guest_people_search-card')"class="fab fa-linkedin-in"></i>
            </div>
         </div>
         </footer>     `
    }}
customElements.define('my-footer', MyFooter)



