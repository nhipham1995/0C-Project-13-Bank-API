import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile, userProfile } from "../Store/ProfileSlice";
// import store from "../Store";

const Profil = () => {
	const { loading, error } = useSelector((state) => state.profile);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isEditMode, setIsEditMode] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [modifiedFirstName, setModifiedFirstName] = useState("");
	const [modifiedLastName, setModifiedLastName] = useState("");

	// if localStorage['user'] === null => return to HomePage
	useEffect(() => {
		const user =
			localStorage.getItem("user") || sessionStorage.getItem("user");
		if (user === null) {
			navigate("/");
			return;
		}
		dispatch(userProfile()).then((result) => {
			if (result.payload) {
				const data = result.payload?.body;
				setFirstName(data.firstName);
				setLastName(data.lastName);
				setModifiedFirstName(data.firstName);
				setModifiedLastName(data.lastName);
			}
		});
	}, [dispatch, navigate]);

	const handleLogoutEvent = async () => {
		await localStorage.removeItem("user");
		await localStorage.removeItem("token");
		navigate("/");
	};

	const handleEditUsernameEvent = (e) => {
		e.preventDefault();
		let newUsername = {
			firstName: modifiedFirstName,
			lastName: modifiedLastName,
		};

		dispatch(updateProfile(newUsername)).then((result) => {
			if (result.payload) {
				setFirstName(result?.payload.body.firstName);
				setLastName(result?.payload.body.lastName);
				setIsEditMode(false);
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
					<a className="main-nav-item" href="./user.html">
						<i className="fa fa-user-circle"></i>
						{firstName}
					</a>
					<span className="main-nav-item" onClick={handleLogoutEvent}>
						<i className="fa fa-sign-out"></i>
						Sign Out
					</span>
				</div>
			</nav>
			<main className="main bg-dark">
				<div className="header">
					<h1>
						Welcome back
						<br />
						{!isEditMode && (
							<>
								{firstName} {lastName}
							</>
						)}
					</h1>
					{!isEditMode && (
						<button
							className="edit-button"
							onClick={() => setIsEditMode(true)}
						>
							Edit Name
						</button>
					)}
					{isEditMode && (
						<form onSubmit={handleEditUsernameEvent}>
							<div className="input-list">
								<div className="input-wrapper">
									<input
										type="text"
										id="username"
										value={modifiedFirstName}
										onChange={(e) =>
											setModifiedFirstName(e.target.value)
										}
									/>
								</div>
								<div className="input-wrapper">
									<input
										type="text"
										id="text"
										value={modifiedLastName}
										onChange={(e) =>
											setModifiedLastName(e.target.value)
										}
									/>
								</div>
							</div>

							<div className="button-list">
								<button
									className="sign-in-button"
									type="submit"
								>
									{loading ? "Saving..." : "Save"}
								</button>
								<button
									className="cancel-button"
									type="button"
									onClick={() => {
										setIsEditMode(!isEditMode);
										setModifiedFirstName(firstName);
										setModifiedLastName(lastName);
									}}
								>
									Cancel
								</button>
							</div>
							{error && (
								<div className="error-message" role="alert">
									Can not update profile! Retry
								</div>
							)}
						</form>
					)}
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
