import React, { useMemo, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { categories, foods } from "../data/foodData";

export default function Menu({ onAdd }) {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const active = params.get("category") || "all";

  const filtered = useMemo(() => foods.filter(f =>
    (active === "all" || f.category === active) &&
    f.name.toLowerCase().includes(search.toLowerCase())
  ), [active, search]);

  return (
    <Container className="py-5">
      <div className="menu-top">
        <div><span>OUR MENU</span><h1>Choose your favourite</h1><p>Click a category or search for your food.</p></div>
        <InputGroup className="search-box">
          <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
          <Form.Control value={search} onChange={e => setSearch(e.target.value)} placeholder="Search food..." />
        </InputGroup>
      </div>
      <div className="category-pills mb-4">
        <Button variant={active === "all" ? "dark" : "outline-dark"} onClick={() => setParams({})}>All</Button>
        {categories.map(c => (
          <Button key={c.id} variant={active === c.id ? "dark" : "outline-dark"} onClick={() => setParams({category:c.id})} className="category-pill-btn">
            <span className="category-pill-icon"><img src={c.image} alt={c.name} /></span>
            {c.name}
          </Button>
        ))}
      </div>
      <Row className="g-4">
        {filtered.length ? filtered.map(food => <Col sm={6} lg={4} xl={3} key={food.id}><FoodCard food={food} onAdd={onAdd} /></Col>)
        : <div className="empty-state"><i className="bi bi-emoji-frown"></i><h3>No food found</h3><p>Try another search or category.</p></div>}
      </Row>
    </Container>
  );
}



