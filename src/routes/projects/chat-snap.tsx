import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/chat-snap')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/projects/chat-snap"!</div>
}
