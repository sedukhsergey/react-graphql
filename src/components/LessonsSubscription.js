import {gql, useMutation, useQuery, useSubscription} from "@apollo/client";

const LESSONS_SUBSCRIPTION = gql`
    subscription {
        lessonAdded {
            id
            name
        }
    }
`;

export const LessonSubscription = () => {
  const { data, loading } = useSubscription(
    LESSONS_SUBSCRIPTION
  );

  console.log('data',data)

  return (
      <div>Subscription</div>
  )
}
