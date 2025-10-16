'use client';

import { format } from 'date-fns';
import { MapPin, FileText, Users, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { postEventMutation } from '@/api/client/@tanstack/react-query.gen';
import { DepartmentAndPrograms } from '@/lib/department-and-program';
import { generateTimeOptions } from '@/lib/utils';

export default function CreateEventForm() {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [requireApproval, setRequireApproval] = useState(false);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 9, 14));
  const [startTime, setStartTime] = useState(format(new Date(), 'hh:mm a'));
  const [endDate, setEndDate] = useState<Date>(new Date(2024, 9, 14));
  const [endTime, setEndTime] = useState('12:30');
  const [capacity, setCapacity] = useState('');
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

      const end = new Date(data.endDate);
      const [endHours, endMinutes] = data.endTime.split(':');
      end.setHours(parseInt(endHours), parseInt(endMinutes));

      return end > start;
    },
    {
      message: 'End date/time must be after start date/time',
      path: ['endDate']
    }
  );

type CreateEventFormValues = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const router = useRouter();
  const timeOptions = generateTimeOptions();
  const departments = Object.keys(DepartmentAndPrograms);

  // Initialize form with default values
  // @ts-expect-error - RHF type inference issue with zod resolver, functionality works correctly
  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      description: '',
      department: '',
      location: '',
      startDate: new Date(),
      startTime: '09:00',
      endDate: new Date(),
      endTime: '10:00',
      isUnlimitedCapacity: true,
      capacity: undefined,
      check_out_required: false,
      all_day: false
    }
  });

  // Create event mutation
  const createEvent = useMutation({
    ...postEventMutation(),
    onSuccess: () => {
      toast.success('Event created successfully!');
      router.push('/events');
    },
    onError: (error) => {
      console.error('Create event error:', error);

      // Extract error message
      const response = error.response;
      const errorData = response?.data;
      let errorMessage = 'Failed to create event';

      if (errorData && typeof errorData === 'object' && 'message' in errorData) {
        errorMessage = String(errorData.message);
      } else if (error.message) {
        errorMessage = error.message;
      }

      const statusCode = response?.status;

      if (statusCode === 403) {
        toast.error('You do not have permission to create events');
      } else if (statusCode === 401) {
        toast.error('Please log in to create events');
        router.push('/');
      } else {
        toast.error(errorMessage);
      }
    }
  });

  // Form submission handler
  const onSubmit = (data: CreateEventFormValues) => {
    // Combine date and time for start and end
    const startDateTime = new Date(data.startDate);
    const [startHours, startMinutes] = data.startTime.split(':');
    startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);

    const endDateTime = new Date(data.endDate);
    const [endHours, endMinutes] = data.endTime.split(':');
    endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

    // Prepare payload for API - only include capacity if not unlimited
    const payload: {
      title: string;
      description: string;
      department: string;
      location: string;
      capacity?: number;
      all_day: boolean;
      start_time: string;
      end_time: string;
      check_out_required: boolean;
      is_done: boolean;
    } = {
      title: data.title,
      description: data.description,
      department: data.department,
      location: data.location,
      all_day: data.all_day,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      check_out_required: data.check_out_required,
      is_done: false
    };

    // Only add capacity field if it has a value
    if (!data.isUnlimitedCapacity && data.capacity) {
      payload.capacity = data.capacity;
    }

    createEvent.mutate({ body: payload });
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Header */}
            <div className="mb-12 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link href="/events">
                  <ChevronLeft className="text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer rounded-full transition-colors" />
                </Link>
                <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Create Event</h1>
              </div>
            </div>

            {/* Event Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Event name"
                      className="text-foreground placeholder:text-muted-foreground/50 min-h-20 w-full max-w-2xl resize-none border-0 bg-neutral-100 !text-6xl font-bold shadow-none focus:outline-none focus-visible:ring-transparent"
                      rows={1}
                      onInput={(e) => {
                        e.currentTarget.style.height = 'auto';
                        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date and Time */}
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
              <div className="space-y-4">
                {/* Start Date/Time */}
                <div className="flex items-center justify-between gap-4">
                  <Label className="text-foreground text-md min-w-[80px] font-medium">Start</Label>
                  <div className="flex flex-1 items-center justify-end gap-1">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="bg-background text-foreground hover:bg-muted hover:border-primary/50 h-9 w-[155px] justify-start rounded-r-none text-left font-medium shadow-none"
                                >
                                  {field.value ? format(field.value, 'EEE, MMMM d') : 'Pick a date'}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="hover:bg-muted hover:border-primary/50 h-9 w-[90px] rounded-l-none font-medium [&>svg]:hidden">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[300px]">
                              {timeOptions.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* End Date/Time */}
                <div className="flex items-center justify-between gap-4">
                  <Label className="text-foreground text-md min-w-[80px] font-medium">End</Label>
                  <div className="flex flex-1 items-center justify-end gap-1">
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="bg-background text-foreground hover:bg-muted hover:border-primary/50 h-9 w-[155px] justify-start rounded-r-none text-left font-medium shadow-none"
                                >
                                  {field.value ? format(field.value, 'EEE, MMMM d') : 'Pick a date'}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="hover:bg-muted hover:border-primary/50 h-9 w-[90px] rounded-l-none font-medium [&>svg]:hidden">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[300px]">
                              {timeOptions.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="bg-card space-y-3 rounded-xl border-1 p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <FormLabel className="text-foreground text-sm font-medium">Event Location</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter location or virtual link"
                      className="focus-visible:border-primary focus-visible:ring-primary/20 font-normal transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="bg-card space-y-3 rounded-xl border-1 p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <FileText className="text-primary h-5 w-5" />
                    </div>
                    <FormLabel className="text-foreground text-sm font-medium">Description</FormLabel>
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add event description..."
                      className="focus-visible:border-primary focus-visible:ring-primary/20 min-h-32 font-normal transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="bg-card space-y-3 rounded-xl border-1 p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <FileText className="text-primary h-5 w-5" />
                    </div>
                    <FormLabel className="text-foreground text-sm font-medium">Department</FormLabel>
                  </div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-border hover:border-foreground/20 bg-background h-12 w-full text-left text-sm break-words !whitespace-normal transition-colors [&>span]:line-clamp-2 [&>span]:text-left [&>span]:leading-normal [&>span]:break-words [&>span]:whitespace-normal">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-w-[calc(100vw-2rem)]">
                      {departments.map((dept) => (
                        <SelectItem
                          key={dept}
                          value={dept}
                          className="h-auto min-h-fit cursor-pointer !items-start py-3 text-sm leading-normal break-words !whitespace-normal"
                        >
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Options */}
            <div className="mt-10 space-y-3">
              <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">Event Options</h3>

              {/* Capacity */}
              <div className="bg-card space-y-3 rounded-xl border-1 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <Users className="text-primary h-5 w-5" />
                    </div>
                    <span className="text-foreground text-sm font-medium">Capacity</span>
                  </div>
                  <FormField
                    control={form.control}
                    name="isUnlimitedCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            type="button"
                            onClick={() => field.onChange(!field.value)}
                            className="text-foreground flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-100/80"
                          >
                            {field.value ? 'Unlimited' : 'Limited'}
                          </Button>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {!form.watch('isUnlimitedCapacity') && (
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter maximum capacity"
                            className="focus-visible:border-primary focus-visible:ring-primary/20 font-normal transition-colors"
                            min="1"
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Check Out Required */}
              <FormField
                control={form.control}
                name="check_out_required"
                render={({ field }) => (
                  <FormItem className="bg-card space-y-3 rounded-xl border-1 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                          <Users className="text-primary h-5 w-5" />
                        </div>
                        <FormLabel className="text-foreground text-sm font-medium">Check Out Required</FormLabel>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>

          {/* Create Event Button */}
          <Link href="/events">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-10 w-full rounded-xl py-7 text-lg font-semibold shadow-lg transition-all hover:shadow-xl">
              Create Event
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
