export const NONE = {}

export default function Resources(resources, accessors) {
  return {
    map(fn) {
      if (!resources) return [fn([NONE, null], 0)]
      return resources.map((resource, idx) =>
        fn([accessors.resourceId(resource), resource], idx)
      )
    },

    groupEvents(events, partTimeResourceIds) {
      const eventsByResource = new Map()

      if (!resources) {
        // Return all events if resources are not provided
        eventsByResource.set(NONE, events)
        return eventsByResource
      }

      events.forEach(event => {
        const resourceId = accessors.resource(event)
        let id
        partTimeResourceIds.includes(resourceId)
          ? (id = 'other')
          : (id = accessors.resource(event) || NONE)
        let resourceEvents = eventsByResource.get(id) || []
        resourceEvents.push(event)
        eventsByResource.set(id, resourceEvents)
      })
      return eventsByResource
    },
  }
}
