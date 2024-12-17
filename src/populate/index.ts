import { main as userPopulate } from './UserPopulate';
import { main as jobTypePopulate } from './JobTypePopulate';
import { main as jobDiscountPopulate } from './JobDiscountPopulate';
import { main as jobPopulate } from './JobPopulate';

const main = async () => {
  await jobTypePopulate();
  await userPopulate();
  await jobDiscountPopulate();
  await jobPopulate();
}

main();