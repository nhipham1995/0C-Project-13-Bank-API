import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/UserSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);

	const { loading, error } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLoginEvent = (e) => {
		e.preventDefault();
		let userCredential = {
			email,
			password,
		};

		dispatch(loginUser(userCredential, remember)).then((result) => {
			if (result.payload) {
				if (remember) {
					localStorage.setItem("user", result.payload.body.token);
				} else {
					sessionStorage.setItem("user", result.payload.body.token);
				}
				setEmail("");
				setPassword("");
				navigate("/profile");
			}
		});
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
					<Link to="/login" className="main-nav-item">
						Sign In
					</Link>
				</div>
			</nav>
			<main className="main bg-dark">
				<div className="form-cover">
					<section className="sign-in-content">
						<i className="fa fa-user-circle sign-in-icon"></i>
						<h1>Sign In</h1>
						<form onSubmit={handleLoginEvent}>
							<div className="input-wrapper">
								<label htmlFor="username">Username</label>
								<input
									type="text"
									id="username"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="input-wrapper">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
							<div className="input-remember">
								<input
									type="checkbox"
									id="remember-me"
									value={remember}
									onChange={() => setRemember(!remember)}
								/>
								<label htmlFor="remember-me">Remember me</label>
							</div>
							{/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
							{/* <a href="./user.html" className="sign-in-button">
							Sign In
						</a> */}
							{/* <!-- SHOULD BE THE BUTTON BELOW --> */}
							<button className="sign-in-button">
								{loading ? "Loading..." : "Sign In"}
							</button>
							{error && (
								<div className="error-message" role="alert">
									Invalid Credential! Retry
								</div>
							)}
						</form>
					</section>
				</div>
			</main>
			<footer className="footer">
				<p className="footer-text">Copyright 2020 Argent Bank</p>
			</footer>
		</div>
	);
};

export default Login;
