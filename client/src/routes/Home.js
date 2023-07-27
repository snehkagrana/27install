import React, { useRef, useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import { Row, Col, ProgressBar, Image } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";
// import "../DarkMode.css";
import image0 from "../images/Investing.png";
import image1 from "../images/Fixed.png";
import image2 from "../images/Economics.png";
import image3 from "../images/Personal.png";
import image4 from "../images/Trading.png";
import image5 from "../images/Crypto.png";
import image6 from "../images/Insurance.png";
import image7 from "../images/Sector.png";
import Dropdown from "react-bootstrap/Dropdown";
import { MDBBtn } from "mdb-react-ui-kit";
import "../styles/file.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FaCalendar, FaStar, FaTrophy, FaMedal } from "react-icons/fa";
import DarkMode from "../components/DarkMode";

////This is the home page of the website, which is user directed to the
////after he has been authenticated, where he is given 2 options whether
////to join an existing room or create a new one

////data represents username of the logged in username
////join room is the invitation link to which user must be redirected to
const Home = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const [userName, setUserName] = useState(null);
    const [skills, setSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [categories, setCategories] = useState([]);
    const role = useRef("");
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [user, setUser] = useState(null);
    const [lastPlayed, setLastPlayed] = useState(null);
    const [continueHeader, setContinueHeader] = useState("");
    const [continueButtonHeader, setContinueButtonHeader] = useState("");
    const [navigateTo, setNavigateTo] = useState(null);
    const [completedSkills, setCompletedSkills] = useState([]);
    const [completedCategories, setCompletedCategories] = useState([]);
    const navigate = useNavigate();

    const statistics = [
        {
            title: "Daily Streak",
            value: user ? user.streak : 0,
            icon: FaCalendar,
            color: "#F9C80E",
        },
    ];

    const images = [
        image0,
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
    ];

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
        var tempFilteredQueries = [];

        skills.forEach((skill) => {
            const searchTerm = event.target.value.toLowerCase();
            const skillName = skill.skill.toLowerCase();

            if (searchTerm && skillName.includes(searchTerm)) {
                tempFilteredQueries.push({
                    type: "skill",
                    skill: skill.skill,
                    name: skill.skill,
                });
            }

            // console.log('categories', skill.categories);
            // (skill.categories).forEach((category) => {
            //   if(searchTerm && category.includes(searchTerm)){
            //     tempFilteredQueries.push(category);
            //   }
            // })

            for (var i = 0; i < skill.categories.length; i++) {
                var category = skill.categories[i];
                if (searchTerm && category.toLowerCase().includes(searchTerm)) {
                    tempFilteredQueries.push({
                        type: "category",
                        skill: skill.skill,
                        category: category,
                        name: category,
                    });
                }
            }

            skill.sub_categories.forEach((subCategory) => {
                const subCategoryName = subCategory.sub_category;
                if (
                    searchTerm &&
                    subCategoryName.toLowerCase().includes(searchTerm)
                ) {
                    tempFilteredQueries.push({
                        type: "subcategory",
                        skill: skill.skill,
                        category: subCategory.category,
                        sub_category: subCategoryName,
                        name: subCategoryName,
                    });
                }
            });
        });

        setFilteredQueries(tempFilteredQueries.slice(0, 10));
        // console.log('tempFilteredQueries', tempFilteredQueries);
    };

    const onSearch = (searchTerm) => {
        setSearchValue(searchTerm);
        // our api to fetch the search result
        // console.log("search ", searchTerm);
        if (searchTerm.type === "skill")
            navigate(`/skills/${searchTerm.skill}`);
        else if (searchTerm.type === "category")
            navigate(`/skills/${searchTerm.skill}/${searchTerm.category}`);
        else
            navigate(
                `/skills/${searchTerm.skill}/${searchTerm.category}/${searchTerm.sub_category}/information/0`
            );
        window.location.reload();
    };

    const getSkills = (last_played) => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/server/skills",
        }).then((res) => {
            // console.log('res.data skills', res.data.data);
            setSkills(res.data.data);
            setSelectedSkill(res.data.data[0]);
            // console.log('last_played', last_played);
            if (Object.entries(last_played).length > 0) {
                if (last_played.skill === null) {
                    // console.log('skill is null');
                    setContinueHeader("Explore new Skills");
                } else {
                    var tempSkills = res.data.data;
                    var ind;
                    for (var i = 0; i < tempSkills.length; i++) {
                        if (tempSkills[i].skill === last_played.skill) ind = i;
                    }
                    // console.log('last_played', last_played);
                    // console.log("ind", ind);
                    var lastPlayedSkill = tempSkills[ind];
                    var subCategories = [];
                    lastPlayedSkill.sub_categories.forEach(function (
                        subCategory
                    ) {
                        if (subCategory.category === last_played.category) {
                            subCategories = subCategories.concat(
                                subCategory.sub_category
                            );
                        }
                    });
                    var categories = lastPlayedSkill.categories;
                    // console.log('categories', categories);
                    // console.log('subCategories', subCategories);

                    var subCategoryIndex = subCategories.indexOf(
                        last_played.sub_category
                    );
                    var categoryIndex = categories.indexOf(
                        last_played.category
                    );

                    if (subCategoryIndex + 1 < subCategories.length) {
                        // console.log('continue with subCategoryIndex', subCategories[subCategoryIndex+1]);
                        setContinueHeader(
                            "In Progress: " +
                                last_played.skill +
                                " -> " +
                                last_played.category
                        );
                        setContinueButtonHeader(
                            subCategories[subCategoryIndex + 1]
                        );
                        setNavigateTo(
                            `/skills/${last_played.skill}/${
                                last_played.category
                            }/${
                                subCategories[subCategoryIndex + 1]
                            }/information/${0}`
                        );
                    } else if (categoryIndex + 1 < categories.length) {
                        // console.log('continue with categoryIndex', categories[categoryIndex+1]);
                        setContinueHeader("In Progress: " + last_played.skill);
                        setContinueButtonHeader(categories[categoryIndex + 1]);
                        setNavigateTo(
                            `/skills/${last_played.skill}/${
                                categories[categoryIndex + 1]
                            }`
                        );
                    } else {
                        // console.log('explore new skill');
                        setContinueHeader("Explore new Skills");
                    }
                }
            } else {
                // console.log('last played not set');
                setContinueHeader("Explore new Skills");
            }
        });
    };

    const getCategories = (forSkill) => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: `/server/categories/${forSkill}`,
        }).then((res) => {
            // console.log('categories', res.data);
            setCategories(res.data.data);
        });
    };

    // When a skill is completed
    const markSkillAsCompleted = (skill) => {
        setCompletedSkills([...completedSkills, skill]);
    };

    // When a category is completed
    const markCategoryAsCompleted = (category) => {
        setCompletedCategories([...completedCategories, category]);
    };

    ////to authenticate user before allowing him to enter the home page
    ////if he is not redirect him to login page
    useEffect(() => {
        // console.log("in use effect");
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/server/login",
        }).then(function (response) {
            if (response.data.redirect == "/login") {
                // console.log("Please log in");
                navigate(`/auth/login`);
            } else if (response.data.redirect == "/updateemail") {
                navigate("/updateemail");
            } else {
                // console.log("Already logged in");
                role.current = response.data.user.role;
                setUser(response.data.user);
                setUserName(
                    response.data.user.displayName
                        ? response.data.user.displayName?.split(" ")[0]
                        : response.data.user.username
                );

                setLastPlayed(response.data.user.last_played);
                getSkills(response.data.user.last_played);
                // console.log("user is", response.data.user);
            }
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Navbar proprole={role} />
            <div className="container mt-5">
                <div className="row h-auto">
                    <div className="col-md-6 mb-4">
                        {userName ? (
                            <Card className="welcome-card">
                                <Card.Body>
                                    <h1>Welcome Back {userName}</h1>
                                    <Card.Text>
                                        {continueHeader !==
                                        "Explore new Skills" ? (
                                            <>
                                                Continue with{" "}
                                                <Button
                                                    variant="success"
                                                    onClick={() =>
                                                        navigate(navigateTo)
                                                    }>
                                                    {continueButtonHeader
                                                        .split("_")
                                                        .join(" ")}
                                                </Button>{" "}
                                            </>
                                        ) : null}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card className="welcome-card">
                                <Card.Body>
                                    <h1>Welcome Back</h1>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                    <div className="col-md-6 w-100">
                        <div className="search-container mb-3">
                            <form className="d-flex input-group">
                                <input
                                    type="search"
                                    value={searchValue}
                                    width="70%"
                                    onChange={onChangeSearchValue}
                                    className="form-control mr-4"
                                    placeholder="Type query"
                                    aria-label="Search"
                                />
                                <MDBBtn
                                    color="success"
                                    onClick={() => onSearch(searchValue)}
                                    style={{ boxShadow: "0px 7px #1a5928" }}>
                                    Search
                                </MDBBtn>
                                <Dropdown.Menu show={searchValue !== ""}>
                                    {filteredQueries.map((item, i) => (
                                        <Dropdown.Item
                                            key={i}
                                            onClick={() => onSearch(item)}>
                                            {item.name.split("_").join(" ")}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </form>
                        </div>
                        <Row>
                            {statistics.map((stat, index) => (
                                <Col key={index}>
                                    <Card
                                        className="mb-4"
                                        style={{
                                            backgroundColor: stat.color,
                                            width: "50%",
                                        }}>
                                        <Card.Body>
                                            <div className="d-flex align-items-center">
                                                <div className="icon-container">
                                                    <stat.icon
                                                        size={24}
                                                        color="#FFF"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <Card.Title>
                                                        {stat.title}
                                                    </Card.Title>
                                                    <Card.Text
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: 30,
                                                        }}>
                                                        {stat.value}
                                                    </Card.Text>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                {/* <Row>
				<Col md={12}>
				<Row>
					{statistics.map((stat, index) => (
					<Col md={3} key={index}>
						<Card className="mb-4" style={{ backgroundColor: stat.color }}>
						<Card.Body>
							<div className="d-flex align-items-center">
							<div className="icon-container">
								<stat.icon size={24} color="#FFF" />
							</div>
							<div className="ml-4">
								<Card.Title>{stat.title}</Card.Title>
								<Card.Text>{stat.value}</Card.Text>
							</div>
							</div>
						</Card.Body>
						</Card>

					</Col>
					))}
				</Row>
				</Col>
			</Row> */}

                <div className="row mt-5">
                    <div className="col-md-12">
                        <h3>Explore</h3>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {skills ? (
                                skills.map(
                                    (skill, idx) => (
                                        console.log(idx),
                                        (
                                            <div className="col" key={idx}>
                                                <Card
                                                    className={`skill-card mt-1 mb-5 ${
                                                        selectedSkill ===
                                                        skill.skill
                                                            ? "selected"
                                                            : ""
                                                    }`}
                                                    style={{ border: "" }}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={images[idx]}
                                                        alt={skill.skill}
                                                    />
                                                    <Card.Body>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <Card.Title>
                                                                {skill.skill
                                                                    .split("_")
                                                                    .join(" ")}
                                                            </Card.Title>
                                                            {selectedSkill ===
                                                                skill.skill &&
                                                                completedSkills.includes(
                                                                    skill.skill
                                                                ) && (
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faCheck
                                                                        }
                                                                        className="checkmark-icon completed"
                                                                    />
                                                                )}
                                                        </div>
                                                        <Card.Text>
                                                            Additional
                                                            information about
                                                            the skill
                                                        </Card.Text>
                                                        <Button
                                                            variant={
                                                                selectedSkill ===
                                                                skill.skill
                                                                    ? "success"
                                                                    : "success"
                                                            }
                                                            style={{
                                                                boxShadow:
                                                                    "0px 7px #1a5928",
                                                            }}
                                                            value={skill.skill}
                                                            onClick={(e) => {
                                                                setSelectedSkill(
                                                                    e.target
                                                                        .value
                                                                );
                                                                getCategories(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}>
                                                            Learn
                                                        </Button>

                                                        {selectedSkill ===
                                                            skill.skill && (
                                                            <div className="categories">
                                                                {categories ? (
                                                                    categories.map(
                                                                        (
                                                                            category,
                                                                            idx
                                                                        ) => (
                                                                            <Button
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                variant="light"
                                                                                onClick={() =>
                                                                                    navigate(
                                                                                        `/skills/${selectedSkill}/${category}`
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    borderColor:
                                                                                        "black",
                                                                                    borderRadius:
                                                                                        "8px",
                                                                                    margin: "2px",
                                                                                }}>
                                                                                <span className="category-text">
                                                                                    {category
                                                                                        .split(
                                                                                            "_"
                                                                                        )
                                                                                        .join(
                                                                                            " "
                                                                                        )}
                                                                                </span>
                                                                                {completedCategories.includes(
                                                                                    category
                                                                                ) && (
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faCheck
                                                                                        }
                                                                                        className="checkmark-icon completed"
                                                                                    />
                                                                                )}
                                                                            </Button>
                                                                        )
                                                                    )
                                                                ) : (
                                                                    <p>
                                                                        No
                                                                        categories
                                                                        found.
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        )
                                    )
                                )
                            ) : (
                                <p>No skills found.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* <div className="row mt-5">
			  <div className="col-md-12">
				<h3>Explore</h3>

				  	

				<div className="row row-cols-1 row-cols-md-3 g-4">
				  {skills ? (
					skills.map((skill, idx) => (
					  <div className="col" key={idx}>
						<Card className={`skill-card mt-1 mb-5 ${selectedSkill === skill.skill ? 'selected' : ''}`}>
						  <Card.Body>
							<Card.Title>{skill.skill.split("_").join(" ")}</Card.Title>
							<Card.Text>Additional information about the skill</Card.Text>
							<Button
							  variant={selectedSkill === skill.skill ? "success" : "light"}
							  value={skill.skill}
							  onClick={(e) => {
								setSelectedSkill(e.target.value);
								getCategories(e.target.value);
							  }}
							>
							  Learn
							</Button>
						  </Card.Body>
						</Card>
						{selectedSkill === skill.skill && (
						  <div className="categories">
							{categories ? (
							  categories.map((category, idx) => (
								<Button
								  key={idx}
								  variant="light"
								  onClick={() => navigate(`/skills/${selectedSkill}/${category}`)}
								  style={{
									borderColor: "black",
									borderRadius: "8px",
									margin: "2px",
								  }}
								>
								  {category.split("_").join(" ")}
								</Button>
							  ))
							) : (
							  <p>No categories found.</p>
							)}
						  </div>
						)}
					  </div>
					))
				  ) : (
					<p>No skills found.</p>
				  )}
				</div>
			  </div>
			</div> */}
            </div>
        </>
    );
};

export default Home;
/*
TODO: Scrollable drop down

{(skills)? ((skills).map((skill, i) =>
					<>
						<br/>
						<div key={i}>
						<Card >
							<Card.Header as="h5">{skill.skill.split("_").join(" ")}</Card.Header>
							<Card.Body>
								<Card.Text>
								Lets learn about {((skill.categories)?(skill.categories).map((category, i) =><>{category.split("_").join(" ")}, </>):null)}
								</Card.Text>
								<Button onClick={() => navigate(`/skills/${skill.skill}`)}>Explore</Button>{' '} 
							</Card.Body>
						</Card>
						</div>
					</>
					)):null}
*/

/* <ToggleButtonGroup type="radio" name="radio">
					{(skills)? skills.map((skill, idx) => (
					<ToggleButton
						key={idx}
						id={`radio-${idx}`}
						variant={selectedSkill === skill.skill? 'success':'outline-success'}
						type="radio"
						value={skill.skill}
						checked={selectedSkill === skill.skill}
						onChange={(e) => {setSelectedSkill(e.target.value); getCategories(e.target.value); console.log(e.target.value);}}
					>
						{skill.skill.split("_").join(" ")}
					</ToggleButton>
					)):null}
					
				</ToggleButtonGroup> */
