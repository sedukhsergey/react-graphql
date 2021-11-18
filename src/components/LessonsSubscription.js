import {gql, useMutation, useQuery} from "@apollo/client";

const LESSONS_SUBSCRIPTION = gql`
    subscription {
        lessonAdded {
            id
            name
        }
    }
`;

export const LessonSubscription = () => {
  return (
      <div>Subscription</div>
  )
}
