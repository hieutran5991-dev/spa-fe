'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { BOOKING_CONFIRM_KEY, BOOKING_INIT_KEY } from '@/utils/constants'
import type { NamespaceKeys } from 'use-intl'
import { SpaLocation } from '@/types/api'
import { BookingData } from '@/types/booking'
import { Product } from '@/types/common'

interface BookingFormProps {
  spaLocations: SpaLocation[]
  children?: React.ReactNode
  selectedService?: Product
  id?: string
}

const BookingForm = ({ spaLocations, children, selectedService, id }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [_error, _setError] = useState<string | null>(null)
  const [selectedSpa, setSelectedSpa] = useState(() => spaLocations[0]?.name ?? '')
  const [selectedSpaId, setSelectedSpaId] = useState<string | number>(() => spaLocations[0]?.id ?? '')
  const [showSpaDropdown, setShowSpaDropdown] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')

  const tBooking = useTranslations('booking' as NamespaceKeys<string, string>)

  // Listen to date changes
  useEffect(() => {
    const dateInput = document.getElementById(`date${id ? `-${id}` : ''}`) as HTMLInputElement
    if (!dateInput) return

    const handleDateChange = () => {
      const currentValue = dateInput.value || ''
      if (currentValue !== selectedDate) {
        setSelectedDate(currentValue)
      }
    }

    // Listen to input changes
    dateInput.addEventListener('change', handleDateChange)
    dateInput.addEventListener('input', handleDateChange)

    // Also check periodically for changes (in case Pikaday updates the value directly)
    const interval = setInterval(handleDateChange, 200)

    return () => {
      dateInput.removeEventListener('change', handleDateChange)
      dateInput.removeEventListener('input', handleDateChange)
      clearInterval(interval)
    }
  }, [id, selectedDate])

  // Check if a time slot has passed today
  const isTimePassed = (time: string): boolean => {
    if (!selectedDate) return false
    
    try {
      // Parse selected date (format: DD-MM-YYYY from Pikaday)
      const dateParts = selectedDate.split('-')
      if (dateParts.length !== 3) return false
      
      const selectedDay = parseInt(dateParts[0], 10)
      const selectedMonth = parseInt(dateParts[1], 10) - 1 // Month is 0-indexed
      const selectedYear = parseInt(dateParts[2], 10)
      
      // Validate parsed values
      if (isNaN(selectedDay) || isNaN(selectedMonth) || isNaN(selectedYear)) return false
      
      // Check if selected date is today
      const today = new Date()
      const isToday = 
        selectedDay === today.getDate() &&
        selectedMonth === today.getMonth() &&
        selectedYear === today.getFullYear()
      
      if (!isToday) return false
      
      // Parse time (format: HH:MM)
      const timeParts = time.split(':')
      if (timeParts.length !== 2) return false
      
      const timeHour = parseInt(timeParts[0], 10)
      const timeMinute = parseInt(timeParts[1], 10)
      
      // Validate parsed time
      if (isNaN(timeHour) || isNaN(timeMinute)) return false
      
      // Create date object for the time slot
      const now = new Date()
      const timeSlotDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeHour, timeMinute, 0, 0)
      
      // Compare with current time
      return timeSlotDate < now
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const bookingData: BookingData<Array<Product[]>> = {
      total_price: {
        VND: 0,
        USD: 0
      },
      agency_name: selectedSpa,
      agency_id: selectedSpaId,
      booking_date: formData.get('date') as string,
      booking_time: formData.get('time') as string,
      people: formData.get('people') as string
    }

    if (selectedService) {
      bookingData.booking_details = Array(parseInt(bookingData.people || '1')).fill([selectedService])
    }

    try {
      sessionStorage.setItem(BOOKING_INIT_KEY, JSON.stringify(bookingData))
      sessionStorage.removeItem(BOOKING_CONFIRM_KEY)
      window.location.href = '/booking'
    } catch (_error) {
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeSlots = {
    availabilityDate: tBooking('today'),
    periods: [
      {
        id: 1,
        period: tBooking('morning'),
        times: ['10:00', '10:30', '11:00', '11:30']
      },
      {
        id: 2,
        period: tBooking('afternoon'),
        times: [
          '12:00',
          '12:30',
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00',
          '16:30',
          '17:00',
          '17:30',
          '18:00',
          '18:30'
        ]
      },
      {
        id: 3,
        period: tBooking('evening'),
        times: ['19:00', '19:30', '20:00', '20:30']
      }
    ]
  }

  const guestSelection = Array.from({ length: 10 }, (_, i) => i + 1)

  const handleSpaSelect = (spaName: string, spaId: string | number) => {
    setSelectedSpa(spaName)
    setSelectedSpaId(spaId)
    setShowSpaDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(`.s1_s2${id ? `-${id}` : ''}`) && !target.closest(`#f2${id ? `-${id}` : ''}`)) {
        setShowSpaDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Ensure date input is clickable immediately, independent of Swiper initialization
  useEffect(() => {
    const dateFieldId = `date${id ? `-${id}` : ''}`
    const dateInputClass = `.js-v1${id ? `-${id}` : ''}`
    
    // Use a retry mechanism to find the date input (in case it's not rendered yet)
    let retryCount = 0
    const maxRetries = 10
    
    const setupDateClickHandler = () => {
      const dateInput = document.querySelector(dateInputClass) as HTMLElement
      if (!dateInput) {
        if (retryCount < maxRetries) {
          retryCount++
          setTimeout(setupDateClickHandler, 50)
        }
        return
      }

      const handleDateClick = (e: Event) => {
        // Don't prevent default if common.js handler should handle it
        // But ensure our handler runs first to show the picker
        
        // Hide other dropdowns
        const otherDropdowns = document.querySelectorAll(`.s1_s2${id ? `-${id}` : ''}, .s1_s3${id ? `-${id}` : ''}, .s1_s4${id ? `-${id}` : ''}`)
        otherDropdowns.forEach((el) => {
          ;(el as HTMLElement).style.display = 'none'
        })

        // Show date picker immediately
        const datePicker = document.querySelector(`.s1_s1${id ? `-${id}` : ''}`) as HTMLElement
        if (datePicker) {
          datePicker.style.display = 'block'
        }

        // Try to trigger Pikaday if it's already initialized (from common.js)
        const dateField = document.getElementById(dateFieldId) as HTMLInputElement
        if (dateField && (dateField as any)._pikaday) {
          const picker = (dateField as any)._pikaday
          if (picker && typeof picker.show === 'function') {
            // Hide all other Pikaday popups first
            const allPikadayPopups = document.querySelectorAll('.pika-single')
            allPikadayPopups.forEach((popup) => {
              const popupEl = popup as HTMLElement
              if (popupEl.style.display !== 'none') {
                popupEl.style.display = 'none'
              }
            })
            picker.show()
          }
        }

        // For mobile
        const ww = window.innerWidth
        if (ww < 992) {
          document.body.classList.add('box-hidden')
          document.querySelector('.main-content')?.classList.add('zf')
        }
      }

      // Add click handler with capture phase to run before common.js handlers
      dateInput.addEventListener('click', handleDateClick, { capture: true, passive: true })
      
      return () => {
        dateInput.removeEventListener('click', handleDateClick, { capture: true })
      }
    }

    // Start setup immediately
    const cleanup = setupDateClickHandler()
    
    return cleanup
  }, [id])

  return (
    <>
      <form id={`formBookBox${id ? `-${id}` : ''}`} className='s1_f' onSubmit={handleSubmit}>
        {children}
        <div className='row'>
          <div className='s1_g'>
            <div className='form-group has-feedback'>
              <input
                type='text'
                id={`f2${id ? `-${id}` : ''}`}
                name='spa'
                className={`form-control u1 js-v2${id ? `-${id}` : ''}`}
                value={selectedSpa}
                onChange={(e) => setSelectedSpa(e.target.value)}
                onFocus={() => {
                  setShowSpaDropdown(true)
                }}
                required
                autoComplete="off"
              />
              <label htmlFor={`f2${id ? `-${id}` : ''}`} className='s1_v'>
                {tBooking('location')}
              </label>
              <span className='fc-feedback'>
                <i className='fa fa-angle-down'></i>
              </span>

              <div
                className={`s1_s${id ? `-${id}` : ''} w2 s1_s2${id ? `-${id}` : ''}`}
                style={{
                  display: showSpaDropdown ? 'block' : 'none'
                }}
              >
                <div className='s1_sh hidden-lg hidden-md'>
                  <div className='s1_st'>{tBooking('selectLocation')}</div>
                  <span className={`s1_x js-done${id ? `-${id}` : ''}`} onClick={() => setShowSpaDropdown(false)}>
                    <i className='ic ic-close'></i>
                  </span>
                </div>
                <div className='s1_sd'>
                  <ul className='s1_d'>
                    {spaLocations &&
                      spaLocations.map((location) => (
                        <li key={location.id} onClick={() => handleSpaSelect(location.name, location.id)}>
                          <strong>{location.name}</strong>
                          <span>{location.address}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className='s1_sf hidden-lg hidden-md'>
                  <span className={`s1_su js-done${id ? `-${id}` : ''} btn btn-1 btn-block`} onClick={() => setShowSpaDropdown(false)}>
                    {tBooking('done')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='s1_g'>
            <div className='form-group has-feedback'>
              <input type='text' id={`date${id ? `-${id}` : ''}`} name='date' className={`form-control u1 js-v1${id ? `-${id}` : ''}`} required autoComplete="off" />
              <label htmlFor={`date${id ? `-${id}` : ''}`} className='s1_v'>
                {tBooking('date')}
              </label>
              <span className='fc-feedback'>
                <i className='fa fa-calendar'></i>
              </span>

              <div className={`s1_s${id ? `-${id}` : ''} w2 s1_s1${id ? `-${id}` : ''}`}>
                <div className='s1_sh hidden-lg hidden-md'>
                  <div className='s1_st'>Select date</div>
                  <span className={`s1_x js-done${id ? `-${id}` : ''}`}>
                    <i className='ic ic-close'></i>
                  </span>
                </div>
                <div className='s1_sd'>
                  <div className='s1_y' id={`iDate${id ? `-${id}` : ''}`}>
                    <div className='pika-single'></div>
                  </div>
                </div>
                <div className='s1_sf hidden-lg hidden-md'>
                  <span className={`s1_su js-done${id ? `-${id}` : ''} btn btn-1 btn-block`}>Done</span>
                </div>
              </div>
            </div>
          </div>
          <div className='s1_g'>
            <div className='form-group has-feedback'>
              <input type='text' id={`f3${id ? `-${id}` : ''}`} name='time' className={`form-control u1 js-v3${id ? `-${id}` : ''}`} required autoComplete="off" />
              <label htmlFor={`f3${id ? `-${id}` : ''}`} className='s1_v'>
                {tBooking('time')}
              </label>
              <span className='fc-feedback'>
                <i className='fa fa-angle-down'></i>
              </span>

              <div className={`s1_s${id ? `-${id}` : ''} w2 s1_s3${id ? `-${id}` : ''}`}>
                <div className='s1_sh hidden-lg hidden-md'>
                  <div className='s1_st'>{tBooking('selectTime')}</div>
                  <span className={`s1_x js-done${id ? `-${id}` : ''}`}>
                    <i className='ic ic-close'></i>
                  </span>
                </div>
                <div className='s1_sd'>
                  <div className='s1_k' id={`listTimes${id ? `-${id}` : ''}`}>
                    <div className='s1_l'>
                      {tBooking('availabilityFor')} {timeSlots.availabilityDate}
                    </div>

                    {timeSlots.periods.map((period) => (
                      <dl key={period.id} className='s1_j'>
                        <dt>{period.period}:</dt>
                        {period.times.map((time) => {
                          const passed = isTimePassed(time)
                          return (
                            <dd 
                              key={time} 
                              className={passed ? 'is-passed' : ''}
                              style={passed ? {
                                opacity: 1,
                                color: '#999',
                                textDecoration: 'line-through',
                                cursor: 'default',
                                pointerEvents: 'none'
                              } : undefined}
                            >
                              {time}
                            </dd>
                          )
                        })}
                      </dl>
                    ))}
                  </div>
                </div>
                <div className='s1_sf hidden-lg hidden-md'>
                  <span className={`s1_su js-done${id ? `-${id}` : ''} btn btn-1 btn-block`}>{tBooking('done')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='s1_g'>
            <div className='form-group has-feedback'>
              <input type='text' id={`f4${id ? `-${id}` : ''}`} name='people' className={`form-control u1 js-v4${id ? `-${id}` : ''}`} required autoComplete="off" />
              <label htmlFor={`f4${id ? `-${id}` : ''}`} className='s1_v'>
                {tBooking('guest')}
              </label>
              <span className='fc-feedback'>
                <i className='fa fa-angle-down'></i>
              </span>

              <div className={`s1_s${id ? `-${id}` : ''} s1_s4${id ? `-${id}` : ''}`}>
                <div className='s1_sh hidden-lg hidden-md'>
                  <div className='s1_st'>{tBooking('selectGuest')}</div>
                  <span className={`s1_x js-done${id ? `-${id}` : ''}`}>
                    <i className='ic ic-close'></i>
                  </span>
                </div>
                <div className='s1_sd'>
                  <ul className='s1_n'>
                    {guestSelection.map((guestNumber) => (
                      <li key={guestNumber}>{guestNumber}</li>
                    ))}
                  </ul>
                </div>
                <div className='s1_sf hidden-lg hidden-md'>
                  <span className={`s1_su js-done${id ? `-${id}` : ''} btn btn-1 btn-block`}>{tBooking('done')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {_error && (
          <div className='error-message' style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
            {_error}
          </div>
        )}
        <button type='submit' className={`btn-book-now btn btn-block btn-1 s1_u booknow${id ? `-${id}` : ''}`} disabled={isSubmitting}>
          {isSubmitting ? tBooking('processing') : tBooking('bookNow')}
        </button>
      </form>
    </>
  )
}

export default BookingForm
