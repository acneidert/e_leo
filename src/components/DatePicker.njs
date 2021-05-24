import Nullstack from 'nullstack';
import uuidv4 from '../util/uuidv4';
import dateUtil from 'date-and-time';

import mask from 'vanilla-text-mask';
import './DatePicker.scss';
import { dateMask } from '../util/mask';

function formatNumber(dateOrMonth) {
  return `0${dateOrMonth}`.slice(-2);
}

/**
 * DatePicker
 * @param {String} name
 * @param {Date || String} date
 * @param {String} format
 */
class DatePicker extends Nullstack {
  id = null;
  selected_date = null;
  show_date = null;
  format = 'DD/MM/YYYY';
  calendar = [];
  month = null;
  months = [
    { name: 'Janeiro', slug: 'Jan' },
    { name: 'Fevereiro', slug: 'Fev' },
    { name: 'Março', slug: 'Mar' },
    { name: 'Abril', slug: 'Abr' },
    { name: 'Maio', slug: 'Mai' },
    { name: 'Junho', slug: 'Jun' },
    { name: 'Julho', slug: 'Jul' },
    { name: 'Agosto', slug: 'Ago' },
    { name: 'Setembro', slug: 'Set' },
    { name: 'Outubro', slug: 'Out' },
    { name: 'Novembro', slug: 'Nov' },
    { name: 'Dezembro', slug: 'Dez' },
  ];

  getYear() {
    return this.show_date.getFullYear();
  }
  setYear({ data }) {
    this.show_date.setYear(data.year);
    this.generateCalendar();
  }
  getMonth() {
    return this.show_date.getUTCMonth();
  }
  setMonth({ data }) {
    this.show_date.setMonth(data.month);
    this.generateCalendar();
  }

  prevMonth() {
    this.show_date = dateUtil.addMonths(this.show_date, -1);
    this.generateCalendar();
  }

  nextMonth() {
    this.show_date = dateUtil.addMonths(this.show_date, 1);
    this.generateCalendar();
  }

  prevYear() {
    this.show_date = dateUtil.addYears(this.show_date, -1);
    this.generateCalendar();
  }

  nextYear() {
    this.show_date = dateUtil.addYears(this.show_date, 1);
    this.generateCalendar();
  }

  getListYears() {
    const list = [];
    for (var i = -4; i < 5; i++) {
      list.push(this.show_date.getUTCFullYear() + i);
    }
    return list;
  }

  setSelectedDate({ date = null }) {
    if (typeof date === 'string' && dateUtil.isValid(date, this.format)) {
      this.selected_date = dateUtil.parse(date, this.format, true);
      this.show_date = this.selected_date;
      return;
    }
    if (date instanceof Date) {
      this.selected_date = date;
      this.show_date = date;
      return;
    }
    this.selected_date = null;
    this.show_date = new Date();
    return;
  }

  getDateStr() {
    if (this.selected_date instanceof Date) {
      return dateUtil.format(this.selected_date, 'DD/MM/YYYY', true);
    }
    return '';
  }

  isToday({ day = '01/01/1900' }) {
    if (this.selected_date instanceof Date)
      return dateUtil.isSameDay(
        dateUtil.parse(day, this.format, true),
        this.selected_date
      );
    return false;
  }

  prepare({}) {
    this.id = uuidv4();
    this.setSelectedDate();
  }

  setDate({ data, onchange }) {
    var value = data.value;
    if (value === 'today') {
      value = new Date();
    } else {
      value = dateUtil.parse(value, this.format, true);
    }
    this.setSelectedDate({ date: value });
    this.generateCalendar();
    onchange({ value, data, onchange });
  }

  cancelSelect({ data, onchange }) {
    this.setSelectedDate({ date: null });
    const value = {};
    onchange({ value, data });
  }

  initiate({ value = '' }) {
    this.setSelectedDate({ date: value, format: this.format });
    this.generateCalendar();
  }

  hydrate({}) {
    const input = document.getElementById(`date-${this.id}`);
    mask({
      inputElement: input,
      mask: dateMask(),
    });
  }
  terminate() {
    Mask.destroy();
  }

  parse({ event, onchange }) {
    var v = event.target.value;
    if (v.replaceAll('_').length === this.format.length) {
      if (dateUtil.isValid(v, this.format)) {
        this.setDate({ data: { value: v }, onchange });
      } else {
        event.target.value = '';
      }
    }
  }

  generateCalendar() {
    const initialDay = new Date(
      this.show_date.getUTCFullYear(),
      this.show_date.getUTCMonth(),
      1
    );
    const lastDay = new Date(
      this.show_date.getUTCFullYear(),
      this.show_date.getUTCMonth() + 1,
      0
    );
    var day = 0;
    var weekDay = 0;
    const linearCalendar = [];
    this.calendar = [];
    do {
      if (day === 0) {
        if (initialDay.getDay() === weekDay) {
          day++;
          linearCalendar.push({
            day,
            date: `${formatNumber(day)}/${formatNumber(
              this.show_date.getUTCMonth() + 1
            )}/${this.show_date.getUTCFullYear()}`,
          });
        } else {
          linearCalendar.push('');
          weekDay++;
        }
      } else {
        day++;
        linearCalendar.push({
          day,
          date: `${formatNumber(day)}/${formatNumber(
            this.show_date.getUTCMonth() + 1
          )}/${this.show_date.getUTCFullYear()}`,
        });
      }
    } while (day < lastDay.getDate());
    for (var i = 0; i < linearCalendar.length + 1; i = i + 7) {
      this.calendar.push(linearCalendar.slice(i, i + 7));
    }
  }

  render({ source, bind, name = '', size = 12 }) {
    return (
      <>
        {/* <div> */}
        <div class={`form-group col-md-${size}`}>
          <label for={this.id} class="">
            {name}
          </label>
          <div class="input-group">
            <input
              name={name}
              value={this.getDateStr()}
              type="text"
              class="form-control pl-2 masked"
              id={`date-${this.id}`}
              placeholder={name}
              oninput={this.parse}
            />
            <div class="input-group-append">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                data-toggle="modal"
                data-target={`#select-${this.id}`}
              >
                <i class="lar la-calendar"></i>
              </button>
            </div>
          </div>
        </div>
        {/* <input hidden source={source} bind={bind} /> */}
        {/* </div> */}
        <div
          class="modal fade search-modal"
          id={`select-${this.id}`}
          tabindex="-1"
          role="dialog"
          aria-labelledby=""
          aria-hidden="true"
        >
          <div class="modal-dialog " role="document">
            <div class="modal-content">
              <div class="card">
                <div class="card-header card-header-primary">
                  <div class="row">
                    <div class="col-md-9">
                      <p class="card-category">Selecione a Data</p>
                      <h4 class="mt-2">
                        {this.getDateStr() !== ''
                          ? this.getDateStr()
                          : '&nbsp;'}
                      </h4>
                    </div>
                    <div class="col-md-2 float-right">
                      <button
                        type="button"
                        class="btn btn-primary"
                        onclick={this.setDate}
                        data-value="today"
                      >
                        <i class="las la-calendar-day"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row text-center justify-content-center">
                    <div class="col-6 align-middle text-center">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          onclick={this.prevMonth}
                        >
                          <i class="las la-angle-left"></i>
                        </button>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {this.months[this.getMonth()].name}
                          </button>
                          <div class="dropdown-menu">
                            {this.months.map((month, index) => (
                              <a
                                class={`dropdown-item ${
                                  this.getMonth() === index ? 'active' : ''
                                }`}
                                href="#"
                                onclick={this.setMonth}
                                data-month={index}
                              >
                                {month.name}
                              </a>
                            ))}
                          </div>
                        </div>
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          onclick={this.nextMonth}
                        >
                          <i class="las la-angle-right"></i>
                        </button>
                      </div>
                    </div>

                    <div class="col-6 align-middle text-center">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          onclick={this.prevYear}
                        >
                          <i class="las la-angle-left"></i>
                        </button>
                        <div class="btn-group" role="group">
                          <button
                            type="button"
                            class="btn btn-primary btn-sm "
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {this.getYear()}
                          </button>
                          <div class="dropdown-menu">
                            {this.getListYears().map((year) => (
                              <a
                                class={`dropdown-item ${
                                  this.getYear() === year ? 'active' : ''
                                }`}
                                href="#"
                                onclick={this.setYear}
                                data-year={year}
                              >
                                {year}
                              </a>
                            ))}
                          </div>
                        </div>
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          onclick={this.nextYear}
                        >
                          <i class="las la-angle-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <table class="table">
                    <thead>
                      <tr>
                        <th class="text-center">Seg</th>
                        <th class="text-center">Ter</th>
                        <th class="text-center">Qua</th>
                        <th class="text-center">Qui</th>
                        <th class="text-center">Sex</th>
                        <th class="text-center">Sab</th>
                        <th class="text-center">Dom</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.calendar.map((week) => (
                        <tr>
                          {week.map((day) => (
                            <td
                              class={`text-center date ${
                                this.isToday({ day: day.date }) ? 'active' : ''
                              }`}
                              onclick={this.setDate}
                              data-value={day.date}
                            >
                              <div>{day.day}</div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div class="card-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onclick={this.cancelSelect}
                  >
                    Limpar
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DatePicker;
