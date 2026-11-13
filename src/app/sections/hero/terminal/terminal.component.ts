import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { profile } from '../../../data/portfolio.data';
import { ThemeService } from '../../../shared/theme.service';
import {
  SUGGESTIONS,
  TerminalEffect,
  TerminalLine,
  complete,
  introLines,
  runCommand,
} from './terminal.commands';

/** Oldest lines are dropped beyond this, so a long session stays light. */
const MAX_LINES = 300;

/**
 * Interactive terminal in the hero. It plays a short scripted intro, then
 * accepts commands. What each command prints is decided in terminal.commands.ts.
 */
@Component({
  selector: 'app-terminal',
  standalone: true,
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css',
})
export class TerminalComponent {
  private readonly theme = inject(ThemeService);
  private readonly injector = inject(Injector);
  private readonly screen = viewChild.required<ElementRef<HTMLElement>>('screen');
  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input');

  protected readonly handle = profile.handle;
  protected readonly suggestions = SUGGESTIONS;
  protected readonly value = signal('');

  private readonly intro = introLines();
  private readonly showIntro = signal(true);
  private readonly typed = signal<TerminalLine[]>([]);

  protected readonly lines = computed(() => [
    ...(this.showIntro() ? this.intro : []),
    ...this.typed(),
  ]);
  /** The prompt appears once the intro has finished typing. */
  protected readonly promptDelay = 350 + this.intro.length * 130;

  /** Commands entered so far, and where ↑ / ↓ currently points in them. */
  private readonly past: string[] = [];
  private cursor = 0;
  private draft = '';

  /** Runs a command: the text in the input, or the one passed in (suggestion chips). */
  protected submit(command: string = this.value()): void {
    const entered = command.trim();
    this.setValue('');
    this.draft = '';

    if (entered) this.past.push(entered);
    this.cursor = this.past.length;

    const result = runCommand(entered, this.past);
    this.print([{ kind: 'command', text: entered }, ...result.lines]);
    if (result.effect) this.apply(result.effect);
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.submit();
        break;

      case 'ArrowUp':
        if (!this.past.length) break;
        event.preventDefault();
        if (this.cursor === this.past.length) this.draft = this.value();
        this.cursor = Math.max(0, this.cursor - 1);
        this.setValue(this.past[this.cursor]);
        break;

      case 'ArrowDown':
        if (this.cursor >= this.past.length) break;
        event.preventDefault();
        this.cursor += 1;
        this.setValue(this.cursor === this.past.length ? this.draft : this.past[this.cursor]);
        break;

      case 'Tab': {
        // With nothing typed, let Tab move focus as usual so keyboard users are not trapped.
        if (!this.value().trim()) break;
        event.preventDefault();
        const completion = complete(this.value());
        if (completion.options.length > 1) {
          this.print([
            { kind: 'command', text: this.value() },
            { kind: 'muted', text: completion.options.join('  ') },
          ]);
        }
        this.setValue(completion.value);
        break;
      }

      case 'l':
        if (event.ctrlKey) {
          event.preventDefault();
          this.apply({ type: 'clear' });
        }
        break;
    }
  }

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  /**
   * Updates the prompt text. The input element is written directly as well, so
   * keys typed before the next render never land on stale text.
   */
  private setValue(value: string): void {
    this.value.set(value);
    this.input().nativeElement.value = value;
  }

  /** Clicking anywhere on the screen focuses the prompt, unless text is being selected. */
  protected focusPrompt(): void {
    if (window.getSelection()?.toString()) return;
    this.input().nativeElement.focus({ preventScroll: true });
  }

  private print(lines: TerminalLine[]): void {
    this.typed.update((current) => [...current, ...lines].slice(-MAX_LINES));
    // Keep the newest output in view once Angular has rendered it.
    afterNextRender(
      () => {
        const screen = this.screen().nativeElement;
        screen.scrollTop = screen.scrollHeight;
      },
      { injector: this.injector },
    );
  }

  private apply(effect: TerminalEffect): void {
    switch (effect.type) {
      case 'clear':
        this.showIntro.set(false);
        this.typed.set([]);
        break;

      case 'open':
        if (effect.url.startsWith('mailto:')) {
          window.location.href = effect.url;
        } else {
          window.open(effect.url, '_blank', 'noopener');
        }
        break;

      case 'goto':
        document.getElementById(effect.id)?.scrollIntoView();
        break;

      case 'theme':
        if (effect.value === 'toggle') this.theme.toggle();
        else this.theme.set(effect.value);
        break;
    }
  }
}
