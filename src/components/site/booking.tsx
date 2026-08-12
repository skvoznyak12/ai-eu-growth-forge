import { createContext, useContext, useState, type ReactNode } from "react";
import { CalendarDays, Check, X } from "lucide-react";

const BookingContext = createContext<{ open: () => void }>({ open: () => {} });
export const useBooking = () => useContext(BookingContext);

const SLOTS = ["Tue 10:00", "Tue 14:30", "Wed 09:00", "Wed 16:00", "Thu 11:30", "Fri 13:00"];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSent(false);
      setSlot(null);
    }, 250);
  };

  return (
    <BookingContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-card p-6 shadow-lift sm:rounded-2xl">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="eyebrow text-primary">Booking</p>
                <h3 className="mt-1 text-2xl font-bold">Book a 30-min consultation</h3>
              </div>
              <button
                onClick={close}
                aria-label="Close booking dialog"
                className="shrink-0 rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {sent ? (
              <div className="mt-6 rounded-xl border border-border bg-secondary/60 p-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mt-4 font-semibold">Request received — {slot} CET</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  A calendar invite will be sent from hello@studio.com. Your data is processed under
                  GDPR Art. 6(1)(b) and never shared with third parties.
                </p>
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="b-name" />
                  <Field label="Corporate email" name="b-email" type="email" />
                </div>
                <Field label="Company" name="b-company" />
                <div>
                  <p className="text-sm font-medium">Pick a slot (CET)</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {SLOTS.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSlot(s)}
                        className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                          slot === s
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex gap-3 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[oklch(0.62_0.2_26)]" />
                  <span>
                    I consent to the processing of my data to arrange this meeting (GDPR). I can
                    withdraw consent at any time.
                  </span>
                </label>
                <button
                  disabled={!slot}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  <CalendarDays className="h-4 w-4" />
                  {slot ? `Confirm ${slot}` : "Select a slot"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        required
        name={name}
        type={type}
        maxLength={120}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
