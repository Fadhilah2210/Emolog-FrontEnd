// Membuat elemen HTML login secara dinamis
document.body.innerHTML = `
    <div class="login-container">
        <div class="login-left-side">
            <h1>Sign In to Emolog</h1>
            <p>or use your e-mail account:</p>
            <form id="login-form">
                <div class="form-group">
                    <div class="input-with-icon">
                        <img src="/assets/account.png" alt="Profile Icon" class="input-icon">
                        <input type="text" id="username" placeholder="Name" required>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-with-icon">
                        <img src="/assets/pass.png" alt="Profile Icon" class="input-icon">
                        <input type="password" id="password" placeholder="Password" required>
                        <img src="/assets/eyes.png" alt="Toggle Password" class="toggle-password" onclick="togglePassword()">
                    </div>
                </div>
                <a href="../forgotpass/forgotpass.html" class="forgot-password">Forgot your password?</a>
                <button type="button" id="login-btn" class="login-btn-sign-in">Sign In</button>
            </form>
        </div>
        <div class="login-right-side">
            <h1>Hello, Sandi!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button class="login-btn-sign-up" onclick="window.location.href='../register/register.html'">Sign Up</button>
        </div>
    </div>
`;

// Menangani klik tombol login
const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', function(event) {
    // Mencegah pengiriman form secara default
    event.preventDefault();

    // Ambil data dari input form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Cek jika username dan password kosong
    if (!username || !password) {
        alert('Username and Password are required!');
        return;
    }

    // Kirim data ke backend menggunakan fetch
    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Menyatakan bahwa kita mengirimkan data dalam format JSON
        },
        body: JSON.stringify({ username, password }) // Mengirim data dalam format JSON
    })
    .then(response => response.json()) // Parsing response dari backend
    .then(data => {
        if (data.success) {
            // Jika login berhasil, arahkan pengguna ke halaman homepage
            window.location.href = '../home/homepage.html';
        } else {
            // Tampilkan pesan kesalahan jika login gagal
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error with the request.');
    });
});

// Fungsi untuk toggle password visibility (jika diperlukan)
function togglePassword() {
    const passwordField = document.getElementById('password');
    const passwordIcon = document.querySelector('.toggle-password');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordIcon.src = "/assets/eyes-open.png"; // Ganti icon jika password terbuka
    } else {
        passwordField.type = 'password';
        passwordIcon.src = "/assets/eyes.png"; // Kembalikan icon jika password disembunyikan
    }
}
