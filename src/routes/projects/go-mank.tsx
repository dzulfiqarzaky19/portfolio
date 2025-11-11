import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/go-mank')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/projects/go-mank"!</div>
}
