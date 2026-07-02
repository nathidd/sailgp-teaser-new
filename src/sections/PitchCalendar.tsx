import type { CalendarSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";

export function PitchCalendar({ data }: { data: CalendarSection }) {
  const events = filterMeaningful(data.events).filter(
    (e) => isMeaningful(e.name) || isMeaningful(e.location)
  );
  if (events.length === 0) return null;

  return (
    <section
      id={SectionId.calendar}
      className="tp-section tp-calendar"
      aria-label="Race calendar"
    >
      <div className="tp-container">
        {(isMeaningful(data.editable?.label) ||
          isMeaningful(data.editable?.headline)) && (
          <Reveal>
            <header className="tp-section-head">
              {isMeaningful(data.editable?.label) && (
                <p className="tp-eyebrow">{data.editable!.label}</p>
              )}
              {isMeaningful(data.editable?.headline) && (
                <h2 className="tp-display tp-display--lg">
                  {data.editable!.headline}
                </h2>
              )}
            </header>
          </Reveal>
        )}
        <ul className="tp-calendar__grid">
          {events.map((event) => (
            <li
              key={event._key ?? `${event.location}-${event.date}`}
              className={`tp-calendar__card${
                event.isHighlighted ? " is-highlighted" : ""
              }`}
            >
              <Reveal>
                {isMeaningful(event.date) && (
                  <p className="tp-calendar__date">{event.date}</p>
                )}
                {isMeaningful(event.location) && (
                  <p className="tp-calendar__city">{event.location}</p>
                )}
                {isMeaningful(event.country) && (
                  <p className="tp-calendar__country">{event.country}</p>
                )}
                {isMeaningful(event.highlightNote) && (
                  <p className="tp-calendar__note">{event.highlightNote}</p>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
