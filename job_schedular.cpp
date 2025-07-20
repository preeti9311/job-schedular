#include <iostream>
using namespace std;

void displayModeMenu() {
    cout << "\n===== CPU Scheduling Simulator =====" << endl;
    cout << "Select Scheduling Mode:" << endl;
    cout << "1. Preemptive" << endl;
    cout << "2. Non-Preemptive" << endl;
    cout << "Enter choice: ";
}

void displayAlgorithmMenu(bool isPreemptive) {
    cout << "\nSelect Scheduling Algorithm:" << endl;
    if (isPreemptive) {
        cout << "1. Shortest Remaining Job First (SRJF)" << endl;
        cout << "2. Priority Scheduling" << endl;
        cout << "3. Round Robin" << endl;
    } else {
        cout << "1. First Come First Serve (FCFS)" << endl;
        cout << "2. Shortest Job First (SJF)" << endl;
        cout << "3. Priority Scheduling" << endl;
    }
    cout << "Enter choice: ";
}

int main() {
    int modeChoice, algoChoice, timeQuantum = 0;
    bool isPreemptive = false;

    displayModeMenu();
    cin >> modeChoice;

    if (modeChoice == 1)
        isPreemptive = true;
    else if (modeChoice == 2)
        isPreemptive = false;
    else {
        cout << "Invalid Mode Selected. Exiting." << endl;
        return 0;
    }

    displayAlgorithmMenu(isPreemptive);
    cin >> algoChoice;

    if (isPreemptive) {
        switch (algoChoice) {
            case 1: cout << "You selected SRJF (Preemptive)" << endl; break;
            case 2: cout << "You selected Priority Scheduling (Preemptive)" << endl; break;
            case 3: 
                cout << "You selected Round Robin (Preemptive)" << endl;
                cout << "Enter Time Quantum: ";
                cin >> timeQuantum;
                break;
            default: cout << "Invalid Algorithm Selected. Exiting." << endl; return 0;
        }
    } else {
        switch (algoChoice) {
            case 1: cout << "You selected FCFS (Non-Preemptive)" << endl; break;
            case 2: cout << "You selected SJF (Non-Preemptive)" << endl; break;
            case 3: cout << "You selected Priority Scheduling (Non-Preemptive)" << endl; break;
            default: cout << "Invalid Algorithm Selected. Exiting." << endl; return 0;
        }
    }

    // You can now call respective algorithm functions here

    return 0;
}
