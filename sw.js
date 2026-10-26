self.addEventListener("push", (event) => {
  let data = {
    title: "Una cartita para vos 💌",
    body: "Ya podés abrir tu cartita. ❤️",
    url: self.registration.scope
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      data: { url: data.url },
      tag: "carta-disponible"
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(
      event.notification.data?.url || self.registration.scope
    )
  );
});
