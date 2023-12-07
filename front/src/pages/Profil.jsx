import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profil = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user === null) {
			navigate("/");
			return;
		}
	}, [navigate]);

	const handleLogoutEvent = async () => {
		await localStorage.removeItem("user");
		console.log("user storage", localStorage.getItem("user"));
		navigate("/");
	};
	return (
		<div>
			<nav className="main-nav">
				<a className="main-nav-logo" href="./index.html">
					<img
						className="main-nav-logo-image"
						src="./img/argentBankLogo.png"
						alt="Argent Bank Logo"
					/>
					<h1 className="sr-only">Argent Bank</h1>
				</a>
				<div>
					<a className="main-nav-item" href="./user.html">
						<i className="fa fa-user-circle"></i>
						Tony
					</a>
					<span className="main-nav-item" onClick={handleLogoutEvent}>
						<i className="fa fa-sign-out"></i>
						Sign Out
					</span>
					{/* <Link to="/" className="main-nav-item">
						Sign 
					</Link> */}
				</div>
			</nav>
			<main className="main bg-dark">
				<div className="header">
					<h1>
						Welcome back
						<br />
						Tony Jarvis!
					</h1>
					<button className="edit-button">Edit Name</button>
				</div>
				<h2 className="sr-only">Accounts</h2>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">
							Argent Bank Checking (x8349)
						</h3>
						<p className="account-amount">$2,082.79</p>
						<p className="account-amount-description">
							Available Balance
						</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">
							View transactions
						</button>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">
							Argent Bank Savings (x6712)
						</h3>
						<p className="account-amount">$10,928.42</p>
						<p className="account-amount-description">
							Available Balance
						</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">
							View transactions
						</button>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">
							Argent Bank Credit Card (x8349)
						</h3>
						<p className="account-amount">$184.30</p>
						<p className="account-amount-description">
							Current Balance
						</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">
							View transactions
						</button>
					</div>
				</section>
			</main>
			<footer className="footer">
				<p className="footer-text">Copyright 2020 Argent Bank</p>
			</footer>
		</div>
	);
};
export default Profil;
