import styled from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem";
import { useCallback, useEffect, useState } from "react";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMeals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        "https://react-http-29f4a-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Somthing went wrong");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      console.log(data);

      setMeals(loadedMeals);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  const mealsList = meals.map((meal) => (
    <li>
      <MealsItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    </li>
  ));

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section>
        <p> Loading...</p>
      </section>
    );
  }

  return (
    <section className={styled.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
