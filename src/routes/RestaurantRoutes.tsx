import { Route, Routes } from "react-router-dom";
import Restaurant from "../pages/restaurant/Restaurant";
import RestaurantDietPlan from "../pages/restaurant/RestaurantDietPlan";
import RestaurantWeekendMeal from "../pages/restaurant/RestaurantWeekendMeal";
import RestaurantSemesterMeal from "../pages/restaurant/RestaurantSemesterMeal";
import RestaurantQRCheck from "../pages/restaurant/RestaurantQRCheck";

function RestaurantRoutes() {
  return (
    <Routes>
      <Route path="management" element={<Restaurant />} />
      <Route path="dietPlan" element={<RestaurantDietPlan />} />
      <Route path="weekendMeal" element={<RestaurantWeekendMeal />} />
      <Route path="semesterMeal" element={<RestaurantSemesterMeal />} />
      <Route path="qrCheck" element={<RestaurantQRCheck />} />
    </Routes>
  );
}

export default RestaurantRoutes;
