import { Route, Routes } from "react-router-dom";
import Restaurant from "../pages/restaurant/Restaurant";
import RestaurantDietPlan from "../pages/restaurant/RestaurantDietPlan";
import RestaurantWeekendMeal from "../pages/restaurant/RestaurantWeekendMeal";
import RestaurantSemesterMeal from "../pages/restaurant/RestaurantSemesterMeal";

function RestaurantRoutes() {
  return (
    <Routes>
      <Route path="" element={<Restaurant />} />
      <Route path="dietPlan" element={<RestaurantDietPlan />} />
      <Route path="weekendMeal" element={<RestaurantWeekendMeal />} />
      <Route path="semesterMeal" element={<RestaurantSemesterMeal />} />
    </Routes>
  );
}

export default RestaurantRoutes;
